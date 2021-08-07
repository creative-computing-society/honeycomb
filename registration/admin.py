from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Participant, Team

##Participant##
class ParticipantResource(resources.ModelResource):
    class Meta:
        model = Participant
        exclude = ('id',)
        import_id_fields = ('uuid',)

class ParticipantAdmin(ImportExportModelAdmin):
    resource_class = ParticipantResource
    list_display = ('uuid', 'name', 'email', 'level', 'team')
    list_display_links = ('uuid', 'name')
    list_filter = ('team_id',)
    search_fields = ('name', 'email', 'level', 'team')
    list_per_page = 25

admin.site.register(Participant, ParticipantAdmin)

##Team##
class TeamResource(resources.ModelResource):
    class Meta:
        model = Team


class TeamAdmin(ImportExportModelAdmin):
    resource_class = TeamResource
    list_display = ('id','teamName', 'score')
    list_display_links = ('id', 'teamName')
    list_filter = ('score',)
    search_fields = ('id','teamName', 'score')
    list_per_page = 25

admin.site.register(Team, TeamAdmin)
