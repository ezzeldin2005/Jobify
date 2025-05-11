from django.shortcuts import render, redirect
from django.urls import reverse
from .models import UserData, AdminData

def index0(request):
    return render(request, 'pages/index0.html')

def Index1(request):
    return render(request, 'pages/Index1.html')

def Index2(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        c_password = request.POST.get('cPassword')
        email = request.POST.get('email')
        company_name = request.POST.get('companyName')
        is_admin = 'AdminBox' in request.POST  # Check if checkbox was checked

        # Validation
        errors = []
        if not username:
            errors.append('Username is required')
        if not email:
            errors.append('Email is required')
        if not password:
            errors.append('Password is required')
        if password != c_password:
            errors.append('Passwords do not match')
        if is_admin and not company_name:
            errors.append('Company name is required for admin registration')

        if errors:
            return render(request, 'pages/Index2.html', {
                'errors': errors,
                'form_data': request.POST
            })

        # Save data
        if is_admin:
            data = AdminData(
                Username=username,
                Password=password,
                Email=email,
                CompanyName=company_name
            )
            data.save()
            # Redirect admin to AdminHomePage
            return redirect(reverse('AdminHomePage'))  # Make sure this URL name exists
        else:
            data = UserData(
                Username=username,
                Password=password,
                Email=email
            )
            data.save()
            # Redirect regular user to UserHomePage
            return redirect(reverse('UserHomePage'))  # Make sure this URL name exists

    # GET request - show empty form
    return render(request, 'pages/Index2.html')