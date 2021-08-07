from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Room, Question, Submission

##Room##
class RoomResource(resources.ModelResource):
    class Meta:
        model = Room
        exclude = ('id',)
        import_id_fields = ('room_id',)

class RoomAdmin(ImportExportModelAdmin):
    resource_class = RoomResource

admin.site.register(Room, RoomAdmin)

##Question##
class QuestionResource(resources.ModelResource):
    class Meta:
        model = Question
        exclude = ('id',)
        import_id_fields = ('qID',)


class QuestionAdmin(ImportExportModelAdmin):
    resource_class = QuestionResource
    list_display = ('qID', 'q_text', 'answer', 'room', 'points', 'is_dead_end')
    list_display_links = ('qID', 'q_text')
    list_filter = ('points', 'room')
    list_editable = ('is_dead_end',)
    search_fields = ('qID', 'q_text', 'answer', 'room', 'points')
    list_per_page = 25

admin.site.register(Question, QuestionAdmin)

##Submission##
class SubmissionResource(resources.ModelResource):
    class Meta:
        model = Submission

class SubmissionAdmin(ImportExportModelAdmin):
    resource_class = SubmissionResource
    list_display = ('participant', 'question', 'ans_submitted')
    list_display_links = ('participant', 'question')
    list_filter = ('participant',)
    search_fields = ('participant', 'question', 'ans_submitted')
    list_per_page = 25

admin.site.register(Submission, SubmissionAdmin)
