from rest_framework.permissions import BasePermission


# Role Constants
ADMIN = "Admin"
MANAGER = "Manager"
INTERN = "Intern"

ADMIN_MANAGER = [ADMIN, MANAGER]


class RolePermission(BasePermission):
    """
    Base permission class.
    Provides a helper method to safely retrieve the user's role.
    Returns None if the user is not authenticated or has no profile.
    """

    def get_role(self, request):
        if not request.user.is_authenticated:
            return None

        if not hasattr(request.user, "profile"):
            return None

        return request.user.profile.role


class IsAdminOrManager(RolePermission):
    """
    Allows only Admin and Manager users.
    Used for creating tasks.
    """

    def has_permission(self, request, view):
        role = self.get_role(request)
        return role in ADMIN_MANAGER


class IsTaskOwnerOrAdminManager(RolePermission):
    """
    Admin and Manager can update any task.
    Intern can update only their assigned task.
    """

    def has_object_permission(self, request, view, obj):
        role = self.get_role(request)

        # Admin and Manager can edit any task
        if role in ADMIN_MANAGER:
            return True

        # Intern can edit only the task assigned to them
        if role == INTERN:
            return obj.assigned_to == request.user

        return False


class IsAdminOnly(RolePermission):
    """
    Allows only Admin users.
    Used for deleting tasks.
    """

    def has_permission(self, request, view):
        return self.get_role(request) == ADMIN