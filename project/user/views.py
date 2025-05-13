from django.shortcuts import render
# from django.contrib.auth.decorators import login_required

# Create your views here.
# @login_required
def UserHomePage(request , username):
    return render(request, 'pages/Index6.html',{'username': username})

# @login_required
def Search(request, username):
    return render(request, 'pages/Index5.html',{'username': username})

# @login_required
def Profile(request, username):
    return render(request, 'pages/Index7.html',{'username': username})
