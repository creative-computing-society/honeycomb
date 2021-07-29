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
            return JsonResponse({'status': 'No questions'})
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
            return JsonResponse({'status': 'Invalid question ID'})
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
            try:
                question = Question.objects.get(qID=question.qID)
            except:
                return JsonResponse({'status': 'Invalid question ID'})
            if question.room.level > self.request.user.team.level:
                return Response({'error': 'You are not allowed to access this room'})
            ans_submitted = serializer.validated_data['ans_submitted']
            ans_correct = question.answer
            if Submission.objects.filter(team=self.request.user.team, question=question).exists():
                return Response({'error': 'You have already submitted an answer for this question'})
            if ans_submitted == ans_correct:
                serializer.save()
                self.request.user.team.score += question.points
                self.request.user.team.save()
                if question.is_dead_end:
                    return JsonResponse({'message': 'dead_end'}, status=400)                
                self.request.user.team.level += 1
                return JsonResponse({'message': 'correct', 'leads_to': question.leads_to.room_id}, status=200)
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
            return JsonResponse({'status': 'Invalid question ID'})
        level = qs.room.level
        if self.request.user.team.level < level:
            return Response({'error': 'You are not allowed to access this room'})
        hint = qs.hint
        return Response({'hint': hint})
