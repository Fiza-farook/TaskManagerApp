import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    CircularProgress,
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
    LoginRounded,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";

import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error("Please enter username and password.");
            return;
        }

        try {
            setLoading(true);

            await login(username, password);

            toast.success("Login successful");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error?.response?.data?.detail ||
                "Invalid username or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="login-page">
            <Paper elevation={8} className="login-card">

                <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary"
                >
                    Task Manager
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Project & Task Management
                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 4,
                            py: 1.5,
                            borderRadius: 3,
                        }}
                        type="submit"
                        startIcon={<LoginRounded />}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                size={24}
                                color="inherit"
                            />
                        ) : (
                            "Login"
                        )}
                    </Button>

                </form>

            </Paper>
        </Box>
    );
};

export default Login;