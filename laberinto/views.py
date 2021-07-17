from django.shortcuts import get_object_or_404, render
from .models import Question


def question(request, question_id):
    question = get_object_or_404(Question, pk=question_id)

    context = {
    'question': question
    }

    return render(request, '', context) 