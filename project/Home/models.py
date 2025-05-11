from django.db import models

# Create your models here.
class AdminData(models.Model):
    Username = models.CharField(max_length= 40)
    Password = models.CharField(max_length= 20)
    Email = models.CharField(max_length= 40)
    CompanyName = models.CharField(max_length= 40)
    ID = models.IntegerField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')

class UserData(models.Model):
    Username = models.CharField(max_length= 40)
    Password = models.CharField(max_length= 20)
    Email = models.CharField(max_length= 40)