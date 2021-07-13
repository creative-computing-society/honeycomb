from django.contrib import admin

from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'display', 'points')
    list_display_links = ('id', 'title')
    list_filter = ('points',)
    list_editable = ('display',)
    search_fields = ('title', 'description', 'points')
    list_per_page = 20

admin.site.register(Task, TaskAdmin)
