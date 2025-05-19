from django.urls import path
from . import views

urlpatterns = [
    path('profileModel/', views.profileModel, name='profileModel'),
    path('AppliedJob/', views.AppliedJob, name = 'AppliedJob'),
    path('<str:username>/', views.UserHomePage, name = 'UserHomePage'),
    path('Profile/<str:username>/', views.Profile, name = 'Profile'),
    path('Search/<str:username>/', views.Search, name = 'Search'),
    path('UpdateInformation/<str:username>/', views.updateInformationPro, name = 'UpdateInformation'),
    path('UploadBackgroundBase64/<str:username>/', views.UploadBackgroundBase64, name='UploadBackgroundBase64'),
    path('DeleteBackground/<str:username>/', views.DeleteBackground, name='DeleteBackground'),
    path('UpdateProfilePicture/<str:username>/', views.UpdateProfilePicture, name='UpdateProfilePicture'),
    path('DeleteProfilePicture/<str:username>/', views.DeleteProfilePicture, name='DeleteProfilePicture'),
]