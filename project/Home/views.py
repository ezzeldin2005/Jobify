from django.db import transaction
from django.shortcuts import render
from .models import UserData, AdminData
from django.http import JsonResponse


def index0(request):
    return render(request, 'pages/index0.html')


def Index1(request):
    return render(request, 'pages/Index1.html')


def Index2(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        company_name = request.POST.get('companyName')

        # Save data
        if company_name != "":
            data = AdminData(
                Username=username,
                Password=password,
                Email=email,
                CompanyName=company_name
            )
            data.save()
        else:
            data = UserData(
                Username=username,
                Password=password,
                Email=email,
            )
            data.save()

    # GET request - show empty form
    return render(request, 'pages/Index2.html')


def userModel(request):
    user_data = UserData.objects.all().values('Username', 'Email', 'Password')
    return JsonResponse(list(user_data), safe=False)


def adminModel(request):
    admin_data = AdminData.objects.all().values('Username', 'Email', 'CompanyName', 'Password')
    return JsonResponse(list(admin_data), safe=False)
