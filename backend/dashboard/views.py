from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import (
    get_dashboard_statistics,
    get_task_status_distribution,
    get_project_summary,
    get_recent_activity,
    get_workload_distribution,
)


class DashboardStatisticsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_dashboard_statistics()
        return Response(data)


class TaskStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_task_status_distribution()
        return Response(data)


class ProjectSummaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_project_summary()
        return Response(data)


class RecentActivityAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_recent_activity()
        return Response(data)

class WorkloadDistributionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_workload_distribution()
        return Response(data)   