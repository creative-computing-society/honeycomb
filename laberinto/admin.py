from django.contrib import admin
from .models import Room, Question, Submission

##Question##
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('qID', 'q_text', 'answer', 'room', 'points', 'is_dead_end')
    list_display_links = ('qID', 'q_text')
    list_filter = ('points', 'room')
    list_editable = ('is_dead_end',)
    search_fields = ('qID', 'q_text', 'answer', 'room', 'points')
    list_per_page = 25

admin.site.register(Question, QuestionAdmin)

##Submission##
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('team_id', 'question', 'ans_submitted')
    list_display_links = ('team_id', 'question')
    list_filter = ('team_id',)
    search_fields = ('team_id', 'question', 'ans_submitted')
    list_per_page = 25

admin.site.register(Room)
admin.site.register(Submission, SubmissionAdmin)
