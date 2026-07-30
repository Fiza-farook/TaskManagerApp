const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER = "user";

const storage = {
    setAccessToken: (token) => {
        localStorage.setItem(ACCESS_TOKEN, token);
    },

    getAccessToken: () => {
        return localStorage.getItem(ACCESS_TOKEN);
    },

    setRefreshToken: (token) => {
        localStorage.setItem(REFRESH_TOKEN, token);
    },

    getRefreshToken: () => {
        return localStorage.getItem(REFRESH_TOKEN);
    },

    setUser: (user) => {
        localStorage.setItem(USER, JSON.stringify(user));
    },

    getUser: () => {
        const user = localStorage.getItem(USER);
        return user ? JSON.parse(user) : null;
    },

    clear: () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(USER);
    },
};

export default storage;