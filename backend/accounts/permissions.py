from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsAdmin

from .models import Project
from .serializers import ProjectSerializer


class ProjectListView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsAdmin]