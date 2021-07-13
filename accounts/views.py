from django.shortcuts import render, redirect
#from django.contrib import messages, auth
#from django.contrib import auth
#from django.contrib.auth.models import User


def register(request):
  return render(request, 'accounts/register.html')

def login(request):
  return render(request, 'accounts/login.html')

def logout(request):
  return redirect('index')
