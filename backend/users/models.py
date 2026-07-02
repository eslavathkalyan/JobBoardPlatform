from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = [
        ("employer", "Employer"),
        ("job_seeker", "Job Seeker"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="job_seeker"
    )

    phone = models.CharField(
        max_length=15,
        blank=True
    )

    location = models.CharField(
        max_length=100,
        blank=True
    )

    def __str__(self):
        return self.username