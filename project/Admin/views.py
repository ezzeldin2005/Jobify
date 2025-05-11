from django.shortcuts import render

# Create your views here.
def AdminHomePage(request):
    return render(request, 'pages/Index3.html')

def AddJob(request):
    return render(request, 'pages/Index4.html')

def EditJob(request):
    return render(request, 'pages/Index8.html')

# def AdminHomePage(request):
#     return render(request, 'pages/Index9.html')