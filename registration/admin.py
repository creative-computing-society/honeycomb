from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Participant, Team

##Participant##
class ParticipantResource(resources.ModelResource):
    class Meta:
        model = Participant

class ParticipantAdmin(ImportExportModelAdmin):
    resource_class = ParticipantResource
    list_display = ('uuid', 'name', 'email', 'team')
    list_display_links = ('uuid', 'name')
    list_filter = ('team_id',)
    search_fields = ('name', 'email', 'team')
    list_per_page = 25

admin.site.register(Participant, ParticipantAdmin)

##Team##
class TeamResource(resources.ModelResource):
    class Meta:
        model = Team


class TeamAdmin(ImportExportModelAdmin):
    resource_class = TeamResource
    list_display = ('id','teamName', 'score', 'level')
    list_display_links = ('id', 'teamName')
    list_filter = ('score',)
    search_fields = ('id','teamName', 'score', 'level')
    list_per_page = 25

admin.site.register(Team, TeamAdmin)
