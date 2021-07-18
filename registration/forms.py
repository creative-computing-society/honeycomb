from django import forms
from .models import Team, Participant

class TeamForm(forms.ModelForm):
    class Meta:
        model = Team
        fields = ['teamName',]

class ParticipantForm(forms.ModelForm):
    class Meta:
        model = Participant
        fields = ['name', 'email', 'mobile', 'team']