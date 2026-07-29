from rest_framework.permissions import BasePermission


class IsAdminOnly(BasePermission):
    """
    Only Admin users can create, update and delete projects.
    """

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        if not hasattr(request.user, "profile"):
            return False

        return request.user.profile.role == "Admin"