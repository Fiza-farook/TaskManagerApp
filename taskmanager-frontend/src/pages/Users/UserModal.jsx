import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserModal = ({
    show,
    mode,
    user,
    loading,
    onClose,
    onSave,
}) => {

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "Intern",
        department: "",
        designation: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (user) {

            setFormData({
                username: user.username || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                password: "",
                role: user.role || "Intern",
                department: user.department || "",
                designation: user.designation || "",
                phone: user.phone || "",
            });

        } else {

            setFormData({
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                role: "Intern",
                department: "",
                designation: "",
                phone: "",
            });

        }

        setErrors({});

    }, [user, show]);

    if (!show) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {

        const validationErrors = {};

        if (!formData.username.trim())
            validationErrors.username = "Username is required.";

        if (!formData.first_name.trim())
            validationErrors.first_name = "First Name is required.";

        if (!formData.last_name.trim())
            validationErrors.last_name = "Last Name is required.";

        if (!formData.email.trim())
            validationErrors.email = "Email is required.";

        if (
            mode === "add" &&
            !formData.password.trim()
        ) {
            validationErrors.password = "Password is required.";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate())
            return;

        onSave(formData);

    };

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                background: "rgba(0,0,0,.5)",
            }}
        >

            <div className="modal-dialog modal-lg modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {mode === "edit"
                                ? "Edit User"
                                : "Add User"}

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Username</label>

                                    <input
                                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.username}
                                    </div>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>First Name</label>

                                    <input
                                        className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.first_name}
                                    </div>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Last Name</label>

                                    <input
                                        className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.last_name}
                                    </div>

                                </div>

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    name="password"
                                    placeholder={
                                        mode === "edit"
                                            ? "Leave blank to keep existing password"
                                            : ""
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.password}
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Role</label>

                                    <select
                                        className="form-select"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option>Admin</option>
                                        <option>Manager</option>
                                        <option>Intern</option>
                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Department</label>

                                    <input
                                        className="form-control"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Designation</label>

                                    <input
                                        className="form-control"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Phone</label>

                                    <input
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : mode === "edit"
                                        ? "Update User"
                                        : "Create User"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
};

UserModal.propTypes = {
    show: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(["add", "edit"]).isRequired,
    user: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default UserModal;