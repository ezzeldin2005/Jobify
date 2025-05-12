from django.db import models

# Create your models here.
class AdminData(models.Model):
    Username = models.CharField(max_length= 40, unique = True)
    Password = models.CharField(max_length= 20)
    Email = models.CharField(max_length= 40)
    CompanyName = models.CharField(max_length= 40)

class UserData(models.Model):
    Username = models.CharField(max_length= 40)
    Password = models.CharField(max_length= 20)
    Email = models.CharField(max_length= 40)