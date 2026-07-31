import api from "./api";

const userService = {
    getUsers: async () => {
        const response = await api.get("/accounts/users/");
        return response.data;
    },

    getUser: async (id) => {
        const response = await api.get(`/accounts/users/${id}/`);
        return response.data;
    },

    createUser: async (data) => {
        const response = await api.post("/accounts/users/", data);
        return response.data;
    },

    updateUser: async (id, data) => {
        const response = await api.put(`/accounts/users/${id}/`, data);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/accounts/users/${id}/`);
        return response.data;
    },
};

export default userService;