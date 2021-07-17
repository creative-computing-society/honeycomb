from django.db import models
from registration.models import Team
from django.db.models.deletion import DO_NOTHING

class Question(models.Model):
    qID = models.IntegerField()
    level = models.IntegerField()
    points = models.IntegerField()
    q_text = models.TextField()
    answer = models.CharField(max_length = 200)  
    is_dead_end = models.BooleanField(default = False)
    
    def __str__(self):
        return self.q_text


class Submission(models.Model):
    team_id = models.ForeignKey(Team, on_delete = models.DO_NOTHING)
    qID = models.ForeignKey(Question, on_delete = models.DO_NOTHING)
    ans_submitted = models.CharField(max_length = 250)
    




