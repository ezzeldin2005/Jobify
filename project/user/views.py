from django.shortcuts import render

# Create your views here.
def UserHomePage(request):
    return render(request, 'pages/Index6.html')

def Search(request):
    return render(request, 'pages/Index5.html')

def Profile(request):
    return render(request, 'pages/Index7.html')
