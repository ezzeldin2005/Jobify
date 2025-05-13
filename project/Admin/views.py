from django.shortcuts import render
# from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import JobData

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