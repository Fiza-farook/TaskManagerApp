import api from "../api/axios";

const taskService = {
    // Get all tasks
    getTasks: async () => {
        const response = await api.get("/tasks/");
        return response.data;
    },

    // Get single task
    getTask: async (id) => {
        const response = await api.get(`/tasks/${id}/`);
        return response.data;
    },

    // Create task
    createTask: async (taskData) => {
        const response = await api.post("/tasks/", taskData);
        return response.data;
    },

    // Update task
    updateTask: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}/`, taskData);
        return response.data;
    },

    // Delete task
    deleteTask: async (id) => {
        const response = await api.delete(`/tasks/${id}/`);
        return response.data;
    },
};

export default taskService;