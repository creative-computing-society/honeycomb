from rest_framework import serializers
from registration.models import Participant, Team
from .models import Room, Question, Submission


class TeamSerializer(serializers.ModelSerializer):
	class Meta:
		model = Team
		fields = ('teamName', 'score')

class ParticipantSerializer(serializers.ModelSerializer):
	team = TeamSerializer()
	class Meta:
		model = Participant
		fields = ('name', 'email', 'team', 'level')


class RoomSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = ('room_id', 'level')

class QuestionSerializer(serializers.ModelSerializer):
	room = RoomSerializer()
	is_solved = serializers.SerializerMethodField('get_is_solved')

	def get_is_solved(self, obj):
		user = self.context['request'].user
		return Submission.objects.filter(question=obj, participant=user).exists()

	class Meta:
		model = Question
		fields =('qID', 'room', 'q_text', 'q_image', 'hint_points', 'is_solved')

class SubmissionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Submission
		fields =('participant', 'question', 'ans_submitted')