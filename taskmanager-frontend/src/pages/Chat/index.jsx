import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import chatService from "../../services/chatService";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

import "./Chat.css";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            setLoading(true);

            const data = await chatService.getHistory();

            setMessages(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load chat history.");
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (message) => {
        try {
            setSending(true);

            const response = await chatService.sendMessage(message);

            setMessages((prev) => [...prev, response]);
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message.");
        } finally {
            setSending(false);
        }
    };

    const clearHistory = async () => {
        try {
            await chatService.clearHistory();

            setMessages([]);

            toast.success("Chat history cleared.");
        } catch (error) {
            console.error(error);
            toast.error("Unable to clear chat.");
        }
    };

    const downloadHistory = async () => {
        try {
            const blob = await chatService.downloadHistory();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "chat_history.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            toast.error("Failed to download PDF.");
        }
    };

    return (
        <div className="container-fluid chat-page">

            <ChatHeader
                onClear={clearHistory}
                onDownload={downloadHistory}
            />

            <ChatBody
                messages={messages}
                loading={loading}
                sending={sending}
            />

            <ChatInput
                onSend={sendMessage}
                sending={sending}
            />

        </div>
    );
};

export default Chat;