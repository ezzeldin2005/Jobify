from .models import *
from Home.models import UserData
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=UserData)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(
            userName=instance.Username,
            email=instance.Email
        )


@receiver(post_save, sender=UserData)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()