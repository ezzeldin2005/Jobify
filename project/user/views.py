from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import AppliedJobs
from django.http import JsonResponse
import json
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

@csrf_exempt
def AppliedJob(request):
    if request.method == "POST":
        body = json.loads(request.body)
        data = AppliedJobs(
            job_ID = body.get('ID'),
            User = body.get('Username'),
        )
        data.save()
        return JsonResponse({'status': 'success'})
    else:
        jobs = AppliedJobs.objects.all().values('job_ID', 'User')
        return JsonResponse(list(jobs), safe=False)