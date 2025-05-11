from django.urls import path
from . import views

urlpatterns = [
    path('', views.index0, name = 'HomePage'),
    path('Login', views.Index1, name = 'Login'),
    path('Signup', views.Index2, name = 'Signup'),

]