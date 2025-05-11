from django.shortcuts import render
# from django.contrib.auth.decorators import login_required

# Create your views here.
# @login_required
def UserHomePage(request):
    return render(request, 'pages/Index6.html')

# @login_required
def Search(request):
    return render(request, 'pages/Index5.html')

# @login_required
def Profile(request):
    return render(request, 'pages/Index7.html')
