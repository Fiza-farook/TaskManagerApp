from django.urls import path

from .views import (
    RegisterAPIView,
    ProfileAPIView,
    ChangePasswordAPIView,
    UserListView,
    UserDetailView,
)

urlpatterns = [
    path(
        "register/",
        RegisterAPIView.as_view(),
        name="register",
    ),

    path(
        "profile/",
        ProfileAPIView.as_view(),
        name="profile",
    ),

    path(
        "change-password/",
        ChangePasswordAPIView.as_view(),
        name="change-password",
    ),

    path(
        "users/",
        UserListView.as_view(),
        name="users",
    ),

    path(
        "users/<int:pk>/",
        UserDetailView.as_view(),
        name="user-detail",
    ),
]