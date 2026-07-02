from django.db import models
from django.conf import settings


class Job(models.Model):
    JOB_TYPES = [
        ("Full-Time", "Full-Time"),
        ("Part-Time", "Part-Time"),
        ("Internship", "Internship"),
    ]

    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    job_type = models.CharField(max_length=20, choices=JOB_TYPES)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title