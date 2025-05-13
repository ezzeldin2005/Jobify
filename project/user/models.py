from django.db import models

# Create your models here.
class AppliedJobs(models.Model):
    Id = models.AutoField(primary_key=True)
    job_ID = models.IntegerField()
    User = models.CharField(max_length=40)