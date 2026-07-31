"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views.
"""

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


def home(request):
    return JsonResponse({
        "message": "Task Manager API is running successfully",
        "status": "success",
        "database": "PostgreSQL",
        "version": "1.0"
    })


urlpatterns = [
    # Home
    path("", home, name="home"),

    # Admin
    path("admin/", admin.site.urls),

    # JWT Authentication
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Accounts API
    path("api/accounts/", include("accounts.urls")),

    # Projects API
    path("api/projects/", include("projects.urls")),

    # Tasks API
    path("api/tasks/", include("tasks.urls")),

    # Chat API
    path("api/chat/", include("chat.urls")),

    # Dashboard API
    path("api/dashboard/", include("dashboard.urls")),
]