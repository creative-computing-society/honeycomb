from rest_framework import serializers
from registration.models import Participant, Team
from .models import Room, Question, Submission


class TeamSerializer(serializers.ModelSerializer):
	class Meta:
		model = Team
		fields = ('teamName', 'score', 'level')

class ParticipantSerializer(serializers.ModelSerializer):
	team = TeamSerializer()
	class Meta:
		model = Participant
		fields = ('name', 'email', 'team')


class RoomSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = ('room_id', 'level')

class QuestionSerializer(serializers.ModelSerializer):
	room = RoomSerializer()
	class Meta:
		model = Question
		fields =('qID', 'room', 'q_text', 'q_image')

class SubmissionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Submission
		fields =('team', 'question', 'ans_submitted')