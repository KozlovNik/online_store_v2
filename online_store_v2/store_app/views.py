from django.shortcuts import render
from django.views.generic import TemplateView

def home(request):
    return render(request, 'store_app/base1.html')

