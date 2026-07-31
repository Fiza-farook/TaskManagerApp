from rest_framework.permissions import BasePermission


class IsAdminOnly(BasePermission):
    """
    Allows access only to Admin users.
    """

    message = "Only Admin users can perform this action."

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and hasattr(request.user, "profile")
            and request.user.profile.role == "Admin"
        )