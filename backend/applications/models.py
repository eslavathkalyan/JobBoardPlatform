from django.db import models
from django.conf import settings
from jobs.models import Job


class Application(models.Model):
    STATUS = [
        ("Pending", "Pending"),
        ("Accepted", "Accepted"),
        ("Rejected", "Rejected"),
    ]

    applicant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE
    )

    resume = models.FileField(upload_to="resumes/")
    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="Pending"
    )

    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant.username} - {self.job.title}"