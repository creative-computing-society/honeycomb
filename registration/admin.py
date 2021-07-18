from django.contrib import admin
from .models import Participant, Team

##Participant##
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'name', 'email', 'team')
    list_display_links = ('uuid', 'name')
    list_filter = ('team_id',)
    search_fields = ('name', 'email', 'team')
    list_per_page = 25

admin.site.register(Participant, ParticipantAdmin)

##Team##
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id','teamName', 'score', 'level')
    list_display_links = ('id', 'teamName')
    list_filter = ('score',)
    search_fields = ('id','teamName', 'score', 'level')
    list_per_page = 25

admin.site.register(Team, TeamAdmin)
