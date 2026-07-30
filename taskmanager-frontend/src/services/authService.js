import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const authService = {
    login: async (username, password) => {
        const response = await api.post(ENDPOINTS.LOGIN, {
            username,
            password,
        });

        return response.data;
    },

    refreshToken: async (refresh) => {
        const response = await api.post(ENDPOINTS.REFRESH, {
            refresh,
        });

        return response.data;
    },
};

export default authService;