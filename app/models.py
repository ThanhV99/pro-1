from django.db import models
from django.contrib.auth.models import User


class AccountEmailConfirm(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    key = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)