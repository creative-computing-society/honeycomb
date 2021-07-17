from django.contrib import admin
from .models import Participant, Team

##Participant##
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'name', 'email', 'team_id')
    list_display_links = ('uuid', 'name')
    list_filter = ('team_id',)
    search_fields = ('name', 'email', 'team_id')
    list_per_page = 25

admin.site.register(Participant, ParticipantAdmin)

##Team##
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'team_id', 'teamName', 'score', 'level')
    list_display_links = ('id', 'team_id', 'teamName')
    list_filter = ('score',)
    search_fields = ('id', 'team_id', 'teamName', 'score', 'level')
    list_per_page = 25

admin.site.register(Team, TeamAdmin)
