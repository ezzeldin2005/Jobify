from django.db import models
from Home.models import AdminData

# Create your models here.
class JobData(models.Model):
    ID = models.IntegerField(primary_key=True)
    Admin = models.ForeignKey(AdminData, on_delete=models.CASCADE, to_field="Username", db_column="Admin")
    CompanyName = models.CharField(max_length=40)
    Title = models.CharField(max_length=40)
    Salary = models.IntegerField()
    Description = models.TextField()
    Experience = models.IntegerField()
    Status = models.CharField(max_length=10)
