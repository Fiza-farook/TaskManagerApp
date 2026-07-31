import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError("Please enter username and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await login(formData.username, formData.password);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Invalid username or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid login-container d-flex justify-content-center align-items-center">

            <div
                className="card login-card p-4"
                style={{ maxWidth: "420px", width: "100%" }}
            >

                <div className="text-center mb-4">
                    <div className="logo-circle mb-3">
                        TM
                    </div>

                    <h2 className="login-title">
                        Task Manager
                    </h2>

                    <p className="text-muted">
                        Sign in to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            background: "#6C63FF",
                            color: "#FFFFFF",
                            padding: "12px",
                            width: "100%",
                            border: "none",
                            borderRadius: "10px",
                            fontWeight: "600",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.8 : 1,
                        }}
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>
                    <div className="text-center mt-4">
                        <span className="login-footer-text">
                            New user?
                        </span>{" "}

                        <Link
                            to="/register"
                            className="text-decoration-none fw-semibold"
                        >
                            Create Account
                        </Link>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default Login;