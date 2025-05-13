from django.urls import path
from . import views

urlpatterns = [
    path('<str:username>/', views.UserHomePage, name = 'UserHomePage'),
    path('Profile/<str:username>/', views.Profile, name = 'Profile'),
    path('Search/<str:username>/', views.Search, name = 'Search'),
]