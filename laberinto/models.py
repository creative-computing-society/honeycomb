from django.db import models
from django.utils import timezone

from registration.models import Team


class Room(models.Model):
    room_id = models.CharField(primary_key=True,max_length=100)
    level = models.IntegerField()

    def __str__(self):
        return self.room_id

class Question(models.Model):
    qID = models.CharField(primary_key=True, max_length=100)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    q_text = models.TextField()
    q_image = models.URLField(blank=True)
    answer = models.CharField(max_length = 200)
    hint = models.TextField(blank=True)
    hint_points = models.IntegerField(default=0)
    is_dead_end = models.BooleanField(default = False)
    leads_to = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='leads_to', null=True)
    
    def __str__(self):
        return self.q_text


class Submission(models.Model):
    team = models.ForeignKey(Team, on_delete = models.CASCADE)
    question = models.ForeignKey(Question, on_delete = models.CASCADE)
    ans_submitted = models.CharField(max_length = 250)
    time_when_submitted = models.DateTimeField(default=None, blank=True, null=True)

    def __str__(self):
        return self.ans_submitted

    def save(self, *args, **kwargs):
        self.time_when_submitted = timezone.now()
        super(Submission, self).save(*args, **kwargs)
