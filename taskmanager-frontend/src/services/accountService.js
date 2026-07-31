import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const accountService = {
    register: async (userData) => {
        const response = await api.post(
            ENDPOINTS.REGISTER,
            userData
        );

        return response.data;
    },

    getProfile: async () => {
        const response = await api.get(
            ENDPOINTS.PROFILE
        );

        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put(
            ENDPOINTS.PROFILE,
            profileData
        );

        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.post(
            ENDPOINTS.CHANGE_PASSWORD,
            passwordData
        );

        return response.data;
    },

    getUsers: async () => {
        const response = await api.get(
            ENDPOINTS.USERS
        );

        return response.data;
    },
};

export default accountService;