import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TaskModal = ({
    show,
    mode,
    task,
    projects,
    users,
    loading,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        project: "",
        assigned_to: "",
        deadline: "",
        status: "Pending",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || "",
                description: task.description || "",
                project: task.project || "",
                assigned_to: task.assigned_to || "",
                deadline: task.deadline || "",
                status: task.status || "Pending",
            });
        } else {
            setFormData({
                title: "",
                description: "",
                project: "",
                assigned_to: "",
                deadline: "",
                status: "Pending",
            });
        }

        setErrors({});
    }, [task, show]);

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

    const validateForm = () => {
        const validationErrors = {};

        if (!formData.title.trim()) {
            validationErrors.title = "Task title is required.";
        }

        if (!formData.description.trim()) {
            validationErrors.description =
                "Description is required.";
        }

        if (!formData.project) {
            validationErrors.project =
                "Please select a project.";
        }

        if (!formData.assigned_to) {
            validationErrors.assigned_to =
                "Please assign a user.";
        }

        if (!formData.deadline) {
            validationErrors.deadline =
                "Deadline is required.";
        }

        if (!formData.status) {
            validationErrors.status =
                "Status is required.";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSave(formData);
    };

    return (
        <>
            <div
                className="modal fade show"
                style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">

                                {mode === "edit"
                                    ? "Edit Task"
                                    : "Add Task"}

                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="modal-body">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Task Title
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.title
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.title}
                                    </div>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        className={`form-control ${errors.description
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Project
                                        </label>

                                        <select
                                            className={`form-select ${errors.project
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            name="project"
                                            value={formData.project}
                                            onChange={handleChange}
                                        >

                                            <option value="">
                                                Select Project
                                            </option>

                                            {projects.map((project) => (
                                                <option
                                                    key={project.id}
                                                    value={project.id}
                                                >
                                                    {project.name}
                                                </option>
                                            ))}

                                        </select>

                                        <div className="invalid-feedback">
                                            {errors.project}
                                        </div>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Assign User
                                        </label>

                                        <select
                                            className={`form-select ${errors.assigned_to
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            name="assigned_to"
                                            value={formData.assigned_to}
                                            onChange={handleChange}
                                        >

                                            <option value="">
                                                Select User
                                            </option>

                                            {users.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.username}
                                                </option>
                                            ))}

                                        </select>

                                        <div className="invalid-feedback">
                                            {errors.assigned_to}
                                        </div>

                                    </div>

                                </div>
                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Deadline
                                        </label>

                                        <input
                                            type="date"
                                            className={`form-control ${errors.deadline
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleChange}
                                        />

                                        <div className="invalid-feedback">
                                            {errors.deadline}
                                        </div>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Status
                                        </label>

                                        <select
                                            className={`form-select ${errors.status
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >

                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="In Progress">
                                                In Progress
                                            </option>

                                            <option value="Completed">
                                                Completed
                                            </option>

                                        </select>

                                        <div className="invalid-feedback">
                                            {errors.status}
                                        </div>

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
                                            ? "Update Task"
                                            : "Create Task"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
};

TaskModal.propTypes = {
    show: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(["add", "edit"]).isRequired,
    task: PropTypes.object,
    projects: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default TaskModal;