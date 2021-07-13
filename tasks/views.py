from django.shortcuts import get_object_or_404, render

from  .models import Task

def index(request):
    #CTF = task.objects.all()
    #context = {'CTF': CTF}
    return render(request, 'tasks/tasks.html')#, context)

def task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    context = {
    'task': task
  }

    return render(request, 'tasks/task.html', context)

