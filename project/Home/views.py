from django.shortcuts import render, redirect
from django.urls import reverse
from .models import UserData, AdminData
from django.http import JsonResponse
import json

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
        is_admin = request.POST.get('AdminBox') == 'on' # Check if checkbox was checked

        print(f"POST received: {username}, {email}, admin: {is_admin}")
        # Save data
        if is_admin:
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
                Email=email
            )
            data.save()

    # GET request - show empty form
    return render(request, 'pages/Index2.html')

def userModel(request):
    user_data = UserData.objects.all().values('Username', 'Email')
    return JsonResponse(list(user_data), safe=False)

def adminModel(request):
    admin_data = AdminData.objects.all().values('Username', 'Email')
    return JsonResponse(list(admin_data), safe=False)