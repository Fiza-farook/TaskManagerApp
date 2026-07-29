from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ChatHistory
from .serializers import (
    ChatHistorySerializer,
    ChatRequestSerializer,
)


class ChatAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)

        if serializer.is_valid():
            message = serializer.validated_data["message"]

            # Temporary AI response
            ai_response = (
                f"You said: '{message}'. "
                "This is a sample AI response. "
                "The real AI integration will be added in the next step."
            )

            chat = ChatHistory.objects.create(
                user=request.user,
                question=message,
                response=ai_response,
            )

            return Response(
                ChatHistorySerializer(chat).data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class ChatHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chats = ChatHistory.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = ChatHistorySerializer(
            chats,
            many=True,
        )

        return Response(serializer.data)


class ClearChatHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        deleted_count, _ = ChatHistory.objects.filter(
            user=request.user
        ).delete()

        return Response(
            {
                "message": f"{deleted_count} chat(s) deleted successfully."
            },
            status=status.HTTP_200_OK,
        )
   