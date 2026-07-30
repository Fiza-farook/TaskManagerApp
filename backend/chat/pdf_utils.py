from io import BytesIO

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer


def generate_chat_history_pdf(user, chats):
    """
    Generate a PDF containing the user's chat history.
    """

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    elements = []

    # Title
    elements.append(Paragraph("<b>Task Manager - Chat History</b>", styles["Title"]))
    elements.append(Spacer(1, 20))

    # Username
    elements.append(
        Paragraph(f"<b>User:</b> {user.username}", styles["Heading2"])
    )
    elements.append(Spacer(1, 15))

    if not chats:
        elements.append(
            Paragraph("No chat history available.", styles["Normal"])
        )
    else:
        for index, chat in enumerate(chats, start=1):

            elements.append(
                Paragraph(f"<b>Conversation {index}</b>", styles["Heading3"])
            )

            elements.append(
                Paragraph(
                    f"<b>Date:</b> {chat.created_at.strftime('%d-%m-%Y %H:%M')}",
                    styles["Normal"],
                )
            )

            elements.append(
                Paragraph(
                    f"<b>Question:</b><br/>{chat.question}",
                    styles["Normal"],
                )
            )

            elements.append(
                Paragraph(
                    f"<b>Response:</b><br/>{chat.response}",
                    styles["Normal"],
                )
            )

            elements.append(Spacer(1, 15))

    doc.build(elements)

    buffer.seek(0)

    return buffer