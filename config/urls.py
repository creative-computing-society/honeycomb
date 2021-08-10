"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from registration import views
from laberinto.views import ParticipantDetailView, QuestionView,QuestionDetailView, SubmissionView, Hint, BackRoute

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/auth/', include('dj_rest_auth.urls')),

    path('api/participant/', ParticipantDetailView.as_view(), name='participant'),
    path('api/question/', QuestionView.as_view(), name='question'),
    path('api/question/<id>', QuestionDetailView.as_view(), name='question'),
    path('api/submission/', SubmissionView.as_view(), name='submission'),
    path('api/hint/', Hint.as_view(), name='hint'),
    path('api/back/', BackRoute.as_view(), name='back'),
]
