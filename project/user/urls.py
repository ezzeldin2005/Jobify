from django.urls import path
from . import views

urlpatterns = [
    path('AppliedJob/', views.AppliedJob, name = 'AppliedJob'),
    path('<str:username>/', views.UserHomePage, name = 'UserHomePage'),
    path('Profile/<str:username>/', views.Profile, name = 'Profile'),
    path('Search/<str:username>/', views.Search, name = 'Search'),
]