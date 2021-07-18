from django.db import models
from django.utils import timezone

from registration.models import Team

class Question(models.Model):
    qID = models.IntegerField(primary_key=True)
    level = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    q_text = models.TextField()
    q_image = models.ImageField(upload_to='images/', blank=True)
    answer = models.CharField(max_length = 200)
    is_dead_end = models.BooleanField(default = False)
    
    def __str__(self):
        return self.q_text


class Submission(models.Model):
    team_id = models.ForeignKey(Team, on_delete = models.CASCADE)
    qID = models.ForeignKey(Question, on_delete = models.CASCADE)
    ans_submitted = models.CharField(max_length = 250)
    time_when_submitted = models.DateTimeField(default=None, blank=True, null=True)

    def __str__(self):
        return self.ans_submitted

    def save(self, *args, **kwargs):
        self.time_when_submitted = timezone.now()
        super(Submission, self).save(*args, **kwargs)




