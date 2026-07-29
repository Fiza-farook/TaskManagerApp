from django.urls import path

from .views import (
    ChatAPIView,
    ChatHistoryAPIView,
    ClearChatHistoryAPIView,
)

urlpatterns = [
    path("", ChatAPIView.as_view(), name="chat"),
    path("history/", ChatHistoryAPIView.as_view(), name="chat-history"),
    path("history/clear/", ClearChatHistoryAPIView.as_view(), name="clear-chat-history"),
]