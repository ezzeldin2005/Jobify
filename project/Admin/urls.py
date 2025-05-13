
from django.urls import path
from . import views

urlpatterns = [
    path('jobModel/', views.jobModel, name = 'jobModel'),
    path('<str:username>/', views.AdminHomePage, name = 'AdminHomePage'),
    path('AddJob/<str:username>/', views.AddJob, name = 'AddJob'),
    path('SearchJob/<str:username>/', views.SearchJob, name = 'SearchJob'),
    path('EditJob/<int:job_id>/', views.EditJob, name = 'EditJob'),
    path('DeleteJob/<int:job_id>/', views.DeleteJob, name = 'DeleteJob'),

]