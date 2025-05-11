from django.shortcuts import render

# Create your views here.

def index0(request):
    return render(request, 'pages/index0.html')

def Index1(request):
    return render(request, 'pages/Index1.html')

def Index2(request):
    return render(request, 'pages/Index2.html')
    