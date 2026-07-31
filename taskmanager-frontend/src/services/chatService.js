import api from "../api/axios";

const chatService = {
    // Send Message
    sendMessage: async (message) => {
        const response = await api.post("/chat/", {
            message,
        });

        return response.data;
    },

    // Get Chat History
    getHistory: async () => {
        const response = await api.get("/chat/history/");
        return response.data;
    },

    // Clear Chat History
    clearHistory: async () => {
        const response = await api.delete("/chat/history/clear/");
        return response.data;
    },

    // Download Chat History PDF
    downloadHistory: async () => {
        const response = await api.get("/chat/export/pdf/", {
            responseType: "blob",
        });

        return response.data;
    },
};

export default chatService;