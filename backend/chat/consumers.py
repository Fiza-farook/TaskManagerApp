import json

from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser


from .services import process_chat_message


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.send(
            text_data=json.dumps(
                {
                    "message": "Connected to TaskManager AI WebSocket!"
                }
            )
        )

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        try:
            data = json.loads(text_data)

            message = data.get("message", "")

            # Temporary user (we'll replace this with JWT authentication next)
            user = self.scope.get("user")

            if not user or isinstance(user, AnonymousUser):
                self.send(
                    text_data=json.dumps(
                        {
                            "error": "Authentication required."
                        }
                    )
                )
                return

            chat = process_chat_message(
                user,
                message,
            )

            self.send(
                text_data=json.dumps(
                    {
                        "question": chat.question,
                        "response": chat.response,
                    }
                )
            )

        except Exception as e:
            self.send(
                text_data=json.dumps(
                    {
                        "error": str(e)
                    }
                )
            )