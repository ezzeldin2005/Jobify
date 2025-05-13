from django.shortcuts import render
from django.http import JsonResponse
from .models import JobData
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
# @login_required
def AdminHomePage(request, username):
    return render(request, 'pages/Index3.html', {'username': username})

#@login_required
def AddJob(request, username):
    if request.method == "POST":
        data = JobData(
            ID=request.POST.get('jobID'),
            CompanyName = request.POST.get('jobCompany'),
            Title = request.POST.get('jobTitle'),
            Salary = request.POST.get('jobSalary'),
            Description = request.POST.get('jobDescription'),
            Status = request.POST.get('jobStatus'),
            Experience = request.POST.get('jobExperience'),
            Admin = username
        )

        data.save()
        return JsonResponse({'status': 'success'})

    else:
        return render(request, 'pages/Index4.html', {'username': username})

# @login_required
def SearchJob(request, username):
    return render(request, 'pages/Index8.html', {'username': username})

def EditJob(request, job_id):
    return render(request, 'pages/Index9.html', {'job_id': job_id})

def jobModel(request):
    jobs = JobData.objects.all().values('ID', 'Admin', 'CompanyName', 'Title', 'Salary', 'Description', 'Experience', 'Status')
    return JsonResponse(list(jobs), safe=False)

def DeleteJob(request, job_id):
    jobToDelete = JobData.objects.get(ID=job_id)
    jobToDelete.delete()
    return JsonResponse({'status': 'success'})

@csrf_exempt
def UpdateJob(request, job_id):
    if request.method == 'PUT':
        try:
            job = JobData.objects.get(ID=job_id)
            data = json.loads(request.body)
            job.CompanyName = data['company']
            job.Title = data['title']
            job.Salary = data['salary']
            job.Experience = data['Experience']
            job.Description = data['description']
            job.Status = data['status']
            job.save()
            return JsonResponse({'message': 'Job updated successfully'})
        except JobData.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)




def getJobsdata(request):
    if request.method == 'GET':
        jobs = JobData.objects.all().values('ID', 'Admin', 'CompanyName', 'Title', 'Salary', 'Description', 'Experience', 'Status')
        return JsonResponse(list(jobs), safe=False)
    return JsonResponse({'error': 'Invalid request method'}, status=400)