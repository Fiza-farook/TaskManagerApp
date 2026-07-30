from django.http import FileResponse

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ChatHistory
from .pdf_utils import generate_chat_history_pdf
from .serializers import (
    ChatHistorySerializer,
    ChatRequestSerializer,
)
from .services import process_chat_message


class ChatAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)

        if serializer.is_valid():
            message = serializer.validated_data["message"]

            chat = process_chat_message(
                request.user,
                message,
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
        chats = (
            ChatHistory.objects.filter(user=request.user)
            .order_by("-created_at")
        )

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


class DownloadChatHistoryPDFAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chats = (
            ChatHistory.objects.filter(user=request.user)
            .order_by("-created_at")
        )

        pdf = generate_chat_history_pdf(
            request.user,
            chats,
        )

        return FileResponse(
            pdf,
            as_attachment=True,
            filename="chat_history.pdf",
            content_type="application/pdf",
        )