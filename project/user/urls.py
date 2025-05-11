from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserHomePage, name = 'UserHomePage'),
    path('Profile', views.Profile, name = 'Profile'),
    path('Search', views.Search, name = 'Search'),
]