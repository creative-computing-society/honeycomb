from django import forms
from .models import Team, Participant

class TeamForm(forms.ModelForm):
    class Meta:
        model = Team
        fields = ['teamName',]

class ParticipantForm(forms.ModelForm):
    class Meta:
        model = Participant
        fields = ['name', 'email', 'mobile', 'team', 'password']

    def save(self, *args, **kwargs):
        member = super(ParticipantForm, self).save(*args, **kwargs)
        member.set_password(self.cleaned_data["password"])
        member.save()