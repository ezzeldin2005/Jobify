from django.contrib import admin
from .models import AppliedJobs, UserProfile
# Register your models here.

admin.site.register(AppliedJobs)
admin.site.register(UserProfile)