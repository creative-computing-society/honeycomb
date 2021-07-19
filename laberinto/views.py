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
        qs = Question.objects.all()
        serializer = QuestionSerializer(qs, many=True)
        return Response(serializer.data)

    

class SubmissionView(APIView):

    permission_classes = (IsAuthenticated, )

    #def get(self, request, *args, **kwargs):
    #    qs = Submission.objects.all()
    #    serializer = SubmissionSerializer(qs, many=True)
    #    return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
