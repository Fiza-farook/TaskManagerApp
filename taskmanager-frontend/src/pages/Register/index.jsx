import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import accountService from "../../services/accountService";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({});
        setSuccess("");
    };

    const validate = () => {
        const validationErrors = {};

        if (!formData.first_name.trim()) {
            validationErrors.first_name = "First name is required";
        }

        if (!formData.last_name.trim()) {
            validationErrors.last_name = "Last name is required";
        }

        if (!formData.username.trim()) {
            validationErrors.username = "Username is required";
        }

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            validationErrors.password =
                "Password must be at least 8 characters";
        }

        if (!formData.confirm_password) {
            validationErrors.confirm_password =
                "Please confirm your password";
        } else if (
            formData.password !== formData.confirm_password
        ) {
            validationErrors.confirm_password =
                "Passwords do not match";
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            await accountService.register(formData);

            setErrors({});
            setSuccess("Account created successfully.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(error);

            if (error.response?.data) {
                setErrors(error.response.data);
            } else {
                alert("Something went wrong.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">

                <h2>Create Account</h2>

                <p>Create your Task Manager account</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <small className="text-danger">
                        {errors.first_name}
                    </small>

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <small className="text-danger">
                        {errors.last_name}
                    </small>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <small className="text-danger">
                        {errors.username}
                    </small>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <small className="text-danger">
                        {errors.email}
                    </small>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <small className="text-danger">
                        {errors.password}
                    </small>

                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                    />
                    <small className="text-danger">
                        {errors.confirm_password}
                    </small>

                    {success && (
                        <div className="alert alert-success mt-3">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mt-3"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <div className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Register;