from rest_framework import serializers
from .models import Question, Submission

class QuestionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Question
		fields =('qID', 'level', 'q_text', 'q_image')

class SubmissionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Submission
		fields ='__all__'