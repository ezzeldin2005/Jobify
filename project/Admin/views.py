from django.shortcuts import render
# from django.contrib.auth.decorators import login_required

# Create your views here.
# @login_required
def AdminHomePage(request):
    return render(request, 'pages/Index3.html')

# @login_required
def AddJob(request):
    return render(request, 'pages/Index4.html')

# @login_required
def EditJob(request):
    return render(request, 'pages/Index8.html')
