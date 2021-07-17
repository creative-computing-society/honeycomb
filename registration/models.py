import uuid
from django.db import models
from django.core.validators import RegexValidator
#from django.db.models.deletion import DO_NOTHING

class Team(models.Model):
    team_id = models.IntegerField()
    teamName = models.CharField(max_length=100)
    score = models.IntegerField()
    level = models.IntegerField()
    
    def __str__(self):
        return self.teamName

class Participant(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_no = models.CharField(
        max_length=16,
        validators=[
            RegexValidator(
                regex="^(\+\d{1,3}[- ]?)?\d{10}$",
                message="Enter a valid mobile number",
                code="invalid_mobile"
            )
        ],
    )
    team_id = models.ForeignKey(Team, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return self.name

