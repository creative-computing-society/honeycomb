from rest_framework import serializers
from registration.models import Participant, Team
from .models import Question, Submission


class TeamSerializer(serializers.ModelSerializer):
	class Meta:
		model = Team
		fields = ('teamName', 'score', 'level')

class ParticipantSerializer(serializers.ModelSerializer):
	team = TeamSerializer()
	class Meta:
		model = Participant
		fields = ('name', 'email', 'team')

class QuestionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Question
		fields =('qID', 'level', 'q_text', 'q_image')

class SubmissionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Submission
		fields =('team', 'question', 'ans_submitted')