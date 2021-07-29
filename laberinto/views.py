from .models import Question, Submission
from django.http import JsonResponse

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView
from rest_framework.response import Response
from .serializers import ParticipantSerializer, QuestionSerializer, SubmissionSerializer


class ParticipantDetailView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        participant = request.user
        serializer = ParticipantSerializer(participant)
        return Response(serializer.data)

class QuestionView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        room = request.data['room']
        qs = Question.objects.filter(room=room)
        if not qs.exists():
            return Response({'status': 'No questions'})
        level = qs[0].room.level
        if self.request.user.team.level < level:
            return Response({'error': 'You are not allowed to access this room'})
        serializer = QuestionSerializer(qs, many=True)
        return Response(serializer.data)


class QuestionDetailView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, *args, **kwargs):
        id = kwargs['id']
        try:
            qs = Question.objects.get(qID=id)
            level = qs.room.level
        except:
            return Response({'status': 'Invalid question ID'})
        if self.request.user.team.level < level:
            return Response({'error': 'You are not allowed to access this room'})
        serializer = QuestionSerializer(qs)
        return Response(serializer.data)
    

class SubmissionView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        data=request.data
        data.update({'team': self.request.user.team.id})
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data['question']

            # Don't allow solving a higher level question
            if question.room.level > self.request.user.team.level:
                return Response({'error': 'You are not allowed to access this room'})

            ans_submitted = serializer.validated_data['ans_submitted']
            ans_correct = question.answer

            # Check if question has already been solved
            if Submission.objects.filter(team=self.request.user.team, question=question).exists():
                return Response({'error': 'You have already submitted an answer for this question'})

            if ans_submitted == ans_correct:
                serializer.save()

                # Don't increase points if solving a prev level question
                if question.room.level < self.request.user.team.level:
                    return Response({'message': 'correct', 'leads_to': question.leads_to.room_id}, status=200)

                self.request.user.team.score += question.points
                self.request.user.team.save()
                
                # Don't increase level if solving a dead end question
                if question.is_dead_end:
                    return Response({'message': 'dead_end'}, status=400)      

                self.request.user.team.level += 1
                self.request.user.team.save()
                return Response({'message': 'correct', 'leads_to': question.leads_to.room_id}, status=200)
                
            return Response({'message': 'incorrect'}, status=400)
        else:
            print("Nah")
            return Response(serializer.errors, status=400)


class Hint(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, *args, **kwargs):
        qID = request.data['qID']
        try:
            qs = Question.objects.get(qID=qID)
        except:
            return Response({'status': 'Invalid question ID'})
        level = qs.room.level
        if self.request.user.team.level < level:
            return Response({'error': 'You are not allowed to access this room'})
        hint = qs.hint
        self.request.user.team.score -= qs.hint_points
        self.request.user.team.save()
        return Response({'hint': hint})
