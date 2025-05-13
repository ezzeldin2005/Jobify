from django.shortcuts import render
from .models import AppliedJobs
from django.http import JsonResponse
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

def AppliedJob(request):
    try:
        jobs = AppliedJobs.objects.all().values('ID', 'User')
        return JsonResponse(list(jobs), safe=False) 
    except AppliedJobs.DoesNotExist:
        return JsonResponse({'error': 'Job not found a7a7a7a7a7'}, status=404)