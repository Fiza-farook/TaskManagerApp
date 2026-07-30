from django.urls import path

from .views import (
    DashboardStatisticsAPIView,
    TaskStatusAPIView,
    ProjectSummaryAPIView,
    RecentActivityAPIView,
)

urlpatterns = [
    path(
        "stats/",
        DashboardStatisticsAPIView.as_view(),
        name="dashboard-stats",
    ),
    path(
        "task-status/",
        TaskStatusAPIView.as_view(),
        name="task-status",
    ),
    path(
        "project-summary/",
        ProjectSummaryAPIView.as_view(),
        name="project-summary",
    ),
    path(
        "recent-activity/",
        RecentActivityAPIView.as_view(),
        name="recent-activity",
    ),
]