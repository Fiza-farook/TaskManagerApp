import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
import storage from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = storage.getAccessToken();
        const savedUser = storage.getUser();

        if (accessToken && savedUser) {
            setUser(savedUser);
            setIsAuthenticated(true);
        }

        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            console.log("===== LOGIN START =====");

            const data = await authService.login(username, password);

            console.log("Backend Response:", data);

            // Save JWT tokens
            storage.setAccessToken(data.access);
            storage.setRefreshToken(data.refresh);

            // Temporary user object (until backend returns profile info)
            const loggedInUser = {
                username: username,
                role: "User",
            };

            storage.setUser(loggedInUser);

            setUser(loggedInUser);
            setIsAuthenticated(true);

            console.log("Saved Access:", storage.getAccessToken());
            console.log("Saved Refresh:", storage.getRefreshToken());
            console.log("Saved User:", storage.getUser());

            console.log("===== LOGIN SUCCESS =====");

            return data;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    const logout = () => {
        storage.clear();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;