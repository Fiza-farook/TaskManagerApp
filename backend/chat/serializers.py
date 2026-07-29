from rest_framework import serializers
from .models import ChatHistory


class ChatHistorySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = ChatHistory
        fields = [
            "id",
            "username",
            "question",
            "response",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "username",
            "response",
            "created_at",
        ]


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=2000)