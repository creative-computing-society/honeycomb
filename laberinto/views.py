#from django.shortcuts import get_object_or_404, render
from django.db.models.query import QuerySet
from django.http.response import FileResponse
from .models import Question, Submission
from django.http import JsonResponse


from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView
from rest_framework.response import Response
#from rest_framework import generics
from .serializers import QuestionSerializer, SubmissionSerializer

class QuestionView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        level = self.request.user.team.level
        qs = Question.objects.filter(level=level)
        serializer = QuestionSerializer(qs, many=True)
        return Response(serializer.data)

    

class SubmissionView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        data=request.data
        data.update({'team': self.request.user.team.id})
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data['question']
            question = Question.objects.get(qID=question.qID)
            ans_submitted = serializer.validated_data['ans_submitted']
            ans_correct = question.answer
            if ans_submitted == ans_correct:
                if question.is_dead_end:
                    return JsonResponse({'message': 'dead_end'}, status=400)
                serializer.save()
                self.request.user.team.level += 1
                self.request.user.team.score += question.points
                self.request.user.team.save()
                return Response({'message': 'correct'}, status=201)
            return Response({'message': 'incorrect'}, status=400)
        else:
            print("Nah")
            return Response(serializer.errors, status=400)
