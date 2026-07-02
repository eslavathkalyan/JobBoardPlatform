from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Job
from .serializers import JobSerializer


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Job.objects.all().order_by("-created_at")
        params = self.request.query_params

        # Filter by job type
        job_type = params.get("job_type")
        if job_type:
            queryset = queryset.filter(job_type__iexact=job_type)

        # Filter by location (partial match)
        location = params.get("location")
        if location:
            queryset = queryset.filter(location__icontains=location)

        # Filter by salary range
        min_salary = params.get("min_salary")
        if min_salary:
            queryset = queryset.filter(salary__gte=min_salary)

        max_salary = params.get("max_salary")
        if max_salary:
            queryset = queryset.filter(salary__lte=max_salary)

        # Full-text search across title, company, description
        search = params.get("search")
        if search:
            from django.db.models import Q
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(company__icontains=search) |
                Q(description__icontains=search) |
                Q(location__icontains=search)
            )

        # Sorting
        sort = params.get("sort", "-created_at")
        allowed_sorts = ["salary", "-salary", "created_at", "-created_at", "title", "-title"]
        if sort in allowed_sorts:
            queryset = queryset.order_by(sort)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)