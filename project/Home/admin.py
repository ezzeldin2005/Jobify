from django.contrib import admin
from .models import UserData, AdminData

from Home.models import AdminData, UserData

# Register your models here.
admin.site.register(UserData)
admin.site.register(AdminData)
