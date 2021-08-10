from .models import Question, Submission
from django.http import JsonResponse

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView
from rest_framework.response import Response
from .serializers import ParticipantSerializer, QuestionSerializer, SubmissionSerializer


def has_permission(request, room):
    qs = Question.objects.filter(room=room)
    level = qs[0].room.level

    # Everyone can access level zero
    if level == 0:
        return True

    # Don't allow solving a higher level question
    if request.user.level < level:
        return False

    # Check if room is unlocked
    qs2 = Question.objects.filter(leads_to=room)
    submission = Submission.objects.filter(question__in=qs2, participant=request.user)
    if not submission.exists():
        return False

    return True


class ParticipantDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        participant = request.user
        qs = Submission.objects.filter(participant=participant, question__room__level=participant.level-1).order_by("-time_when_submitted")
        serializer = ParticipantSerializer(participant)
        data = serializer.data
        if qs.exists():
            data.update({"room": qs[0].question.leads_to.room_id})
        return Response(data)


class QuestionView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        room = request.data["room"]
        qs = Question.objects.filter(room=room)

        # Check if room ID is valid
        if not qs.exists():
            return Response([])

        # Check if user has permission to access room
        if has_permission(request, room):
            serializer = QuestionSerializer(qs, many=True)
            return Response(serializer.data)

        return Response([])


class QuestionDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        id = kwargs["id"]

        # Check if question ID is valid
        try:
            qs = Question.objects.get(qID=id)
        except:
            return Response({"error": "Invalid question ID"})

        # Check if user has permission to access room
        if has_permission(request, qs.room):
            serializer = QuestionSerializer(qs)
            return Response(serializer.data)

        return Response({"error": "You are not allowed to access this question"})


class SubmissionView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        data = request.data
        data.update({"participant": self.request.user.uuid})
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data["question"]

            # Check if user has permission to access room
            if not has_permission(request, question.room):
                return Response({"error": "You are not allowed to access this question"})

            ans_submitted = serializer.validated_data["ans_submitted"].strip()
            ans_correct = question.answer

            if Submission.objects.filter(
                participant=self.request.user, question=question
            ).exists():
                # Check if question has already been solved by same participant
                return Response(
                    {"error": "You have already submitted an answer for this question", "leads_to": question.leads_to.room_id}
                )

            if ans_submitted == ans_correct:
                
                if not Submission.objects.filter(
                    question=question, participant__team=self.request.user.team
                ).exists():
                    # Increase points only if question hasn't already been solved by team
                    self.request.user.team.score += question.points
                    self.request.user.team.save()

                serializer.save()
                if question.is_dead_end:
                    # Don't increase level if solving a dead end question
                    return Response(
                        {"message": "correct", "leads_to": "dead_end"}, status=200
                    )

                if question.room.level < self.request.user.level:
                    # Don't increase level if solving a prev level question
                    return Response(
                        {"message": "correct", "leads_to": question.leads_to.room_id},
                        status=200,
                    )

                self.request.user.level += 1
                self.request.user.save()
                return Response(
                    {"message": "correct", "leads_to": question.leads_to.room_id},
                    status=200,
                )

            return Response({"message": "incorrect", "question": question.qID}, status=400)
        else:
            print("Nah")
            return Response(serializer.errors, status=400)


class Hint(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        qID = request.data["qID"]
        
        # Check if question ID is valid
        try:
            qs = Question.objects.get(qID=qID)
        except:
            return Response({"error": "Invalid question ID"})

        if not has_permission(request, qs.room):
            return Response({"error": "You are not allowed to access this question"})

        # Deduct points for hint
        self.request.user.team.score -= qs.hint_points
        if self.request.user.team.score < 0:
            return Response({"error": "You don't have enough points"}, status=400)
        self.request.user.team.save()
        return Response({"hint": qs.hint})
