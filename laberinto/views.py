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
        serializer = ParticipantSerializer(participant)
        return Response(serializer.data)


class QuestionView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        room = request.data["room"]
        qs = Question.objects.filter(room=room)
        if not qs.exists():
            return Response({"status": "No questions"})

        if has_permission(request, room):
            serializer = QuestionSerializer(qs, many=True)
            return Response(serializer.data)

        return Response({"error": "You are not allowed to access this room"})


class QuestionDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        id = kwargs["id"]
        try:
            qs = Question.objects.get(qID=id)
            level = qs.room.level
        except:
            return Response({"status": "Invalid question ID"})

        room = qs.room
        if has_permission(request, room):
            serializer = QuestionSerializer(qs)
            return Response(serializer.data)

        return Response({"error": "You are not allowed to access this room"})


class SubmissionView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        data = request.data
        data.update({"participant": self.request.user.uuid})
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data["question"]

            if not has_permission(request, question.room):
                return Response({"error": "You are not allowed to access this room"})

            ans_submitted = serializer.validated_data["ans_submitted"].strip()
            ans_correct = question.answer

            # Check if question has already been solved
            if Submission.objects.filter(
                participant=self.request.user, question=question
            ).exists():
                return Response(
                    {"error": "You have already submitted an answer for this question"}
                )

            if ans_submitted == ans_correct:
                serializer.save()
                self.request.user.team.score += question.points
                self.request.user.team.save()

                # Don't increase level if solving a dead end question
                if question.is_dead_end:
                    return Response(
                        {"message": "dead_end", "leads_to": "dead_end"}, status=400
                    )

                # Don't increase level if solving a prev level question
                if question.room.level < self.request.user.level:
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

            return Response({"message": "incorrect"}, status=400)
        else:
            print("Nah")
            return Response(serializer.errors, status=400)


class Hint(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        qID = request.data["qID"]
        try:
            qs = Question.objects.get(qID=qID)
        except:
            return Response({"status": "Invalid question ID"})

        if not has_permission(request, qs.room):
            return Response({"error": "You are not allowed to access this room"})
        hint = qs.hint
        self.request.user.team.score -= qs.hint_points
        self.request.user.team.save()
        return Response({"hint": hint})
