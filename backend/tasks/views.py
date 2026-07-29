from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Task
from .serializers import TaskSerializer
from .permissions import (
    IsAdminOrManager,
    IsTaskOwnerOrAdminManager,
    IsAdminOnly,
)


class TaskListView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_permissions(self):

        # Only Admin and Manager can create tasks
        if self.request.method == "POST":
            return [IsAdminOrManager()]

        # Anyone authenticated can view tasks
        return [IsAuthenticated()]


    def get_queryset(self):

        if hasattr(self.request.user, "profile"):

            role = self.request.user.profile.role

            # Intern can only see their assigned tasks
            if role == "Intern":
                return Task.objects.filter(
                    assigned_to=self.request.user
                )

        # Admin and Manager can see all tasks
        return Task.objects.all()



class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


    def get_permissions(self):

        # Update permissions
        if self.request.method in ["PUT", "PATCH"]:
            return [IsTaskOwnerOrAdminManager()]


        # Delete permissions
        if self.request.method == "DELETE":
            return [IsAdminOnly()]


        # Retrieve permissions
        return [IsAuthenticated()]