from django.urls import path
from . import views

urlpatterns = [
    path('AdminHomePage', views.AdminHomePage, name = 'AdminHomePage'),
    path('AddJob', views.AddJob, name = 'AddJob'),
    path('EditJob', views.EditJob, name = 'EditJob'),
]