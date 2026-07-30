import google.generativeai as genai
from django.conf import settings

from .models import ChatHistory

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Load Gemini model
model = genai.GenerativeModel("models/gemini-3.6-flash")


def get_gemini_response(prompt: str, conversation_history: str = "") -> str:
    try:
        # System Prompt
        system_prompt = """
You are TaskManager AI Assistant.

Your purpose is to help employees with:

- Company policies
- HR policies
- Leave policy
- Attendance policy
- Employee guidelines
- Project management
- Task management
- Workplace rules

Rules:
1. Answer only questions related to the above topics.
2. Be professional, clear, and concise.
3. If the question is outside these topics, politely reply:
   "I can only assist with company policy, HR, attendance, leave, project management, and task-related questions."
4. If you don't know the answer, say:
   "I don't have information about that policy."
"""

        # Final Prompt
        full_prompt = f"""
{system_prompt}

Previous Conversation:
{conversation_history}

Instructions:
- Use the previous conversation to understand follow-up questions.
- If the current question refers to something mentioned earlier (for example: "it", "that", "them"), determine what it refers to from the previous conversation.
- If there is no relevant previous context, answer only the current question.
- Be concise and professional.

Current Employee Question:
{prompt}
"""

        response = model.generate_content(full_prompt)

        if hasattr(response, "text") and response.text:
            return response.text

        return "No response generated."

    except Exception as e:
        return f"Gemini Error: {str(e)}"


def process_chat_message(user, message):
    """
    Processes a chat message by:
    - Loading recent conversation history
    - Getting Gemini response
    - Saving the conversation
    """

    recent_chats = (
        ChatHistory.objects.filter(user=user)
        .order_by("-created_at")[:5]
    )

    conversation_history = ""

    for chat in reversed(recent_chats):
        conversation_history += (
            f"User: {chat.question}\n"
            f"Assistant: {chat.response}\n\n"
        )

    ai_response = get_gemini_response(
        message,
        conversation_history,
    )

    chat = ChatHistory.objects.create(
        user=user,
        question=message,
        response=ai_response,
    )

    return chat