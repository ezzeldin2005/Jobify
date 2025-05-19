from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import AppliedJobs, UserProfile
from django.http import JsonResponse
import json
import base64
import uuid
from django.core.files.base import ContentFile
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

def profileModel(request):
    profiles = UserProfile.objects.all().values('userName', 'email', 'jobsTitle', 'phone_number', 'bio', 'profilePic', 'backgroundPic')
    return JsonResponse(list(profiles), safe=False)


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


@csrf_exempt
def updateInformationPro(request, username):
    if request.method == 'PUT':
        try:
            profile = UserProfile.objects.get(userName=username)
            data = json.loads(request.body)
            profile.userName = data['USERNAME']
            profile.jobsTitle = data['JOBTITLE']
            profile.phone_number = data['PHONE']
            profile.bio = data['ABOUT']
            profile.save()
            return JsonResponse({'message': 'updated successfully'})
        except JobData.DoesNotExist:
            return JsonResponse({'error': 'profile not found'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def UploadBackgroundBase64(request, username):
    if request.method == 'POST':
        try:
            profile = UserProfile.objects.get(userName=username)
            data = json.loads(request.body)
            image_data = data.get('image')

            if not image_data.startswith('data:image'):
                return JsonResponse({'error': 'Invalid image data'}, status=400)

            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            file_name = f"{uuid.uuid4()}.{ext}"

            decoded_image = ContentFile(base64.b64decode(imgstr), name=file_name)
            profile.backgroundPic.save(file_name, decoded_image)
            profile.save()

            return JsonResponse({'message': 'Upload successful', 'background_url': profile.backgroundPic.url})
        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)



@csrf_exempt
def DeleteBackground(request, username):
    if request.method == 'POST':
        try:
            profile = UserProfile.objects.get(userName=username)

            # Reset background to default
            profile.backgroundPic = "defaults/defaultBackground.jpg"
            profile.save()

            return JsonResponse({'message': 'Background reset', 'background_url': profile.backgroundPic.url})
        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def UpdateProfilePicture(request, username):
    if request.method == 'POST':
        try:
            profile = UserProfile.objects.get(userName=username)
            data = json.loads(request.body)
            image_data = data.get('image')

            if image_data:
                format, imgstr = image_data.split(';base64,')  # split base64 string
                ext = format.split('/')[-1]  # get file extension
                file_name = f'{username}_profile.{ext}'
                profile.profilePic.save(file_name, ContentFile(base64.b64decode(imgstr)), save=True)

                return JsonResponse({'profile_url': profile.profilePic.url})
            else:
                return JsonResponse({'error': 'No image provided'}, status=400)

        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def DeleteProfilePicture(request, username):
    if request.method == 'POST':
        try:
            profile = UserProfile.objects.get(userName=username)
            profile.profilePic = "defaults/default-profile-picture.png"
            profile.save()
            return JsonResponse({'profile_url': profile.profilePic.url})
        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


