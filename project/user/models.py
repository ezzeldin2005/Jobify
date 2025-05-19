from django.db import models

# Create your models here.
class AppliedJobs(models.Model):
    Id = models.AutoField(primary_key=True)
    job_ID = models.IntegerField()
    User = models.CharField(max_length=40)


class UserProfile(models.Model):
    userName = models.CharField(max_length=40)
    email = models.EmailField()
    profilePic = models.ImageField(upload_to='photos/%y/%m/%d', default='defaults/default-profile-picture.png', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)
    jobsTitle = models.CharField(max_length=60, null=True, blank=True)
    backgroundPic = models.ImageField(upload_to='photos/%y/%m/%d', default="defaults/defaultBackground.jpg",  null=True, blank=True)
    
    def __str__(self):
        return f"{self.userName}'s Profile"