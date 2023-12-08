# Generated by Django 4.2.7 on 2023-12-08 03:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="AccountEmailConfirm",
            fields=[
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        serialize=False,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("key", models.TextField(blank=True, null=True)),
                ("is_active", models.BooleanField(default=False)),
            ],
        ),
    ]