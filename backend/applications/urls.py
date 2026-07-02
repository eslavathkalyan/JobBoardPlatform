from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ApplicationViewSet

router = DefaultRouter()
router.register(r"applications", ApplicationViewSet, basename="applications")

urlpatterns = [
    path("", include(router.urls)),
]