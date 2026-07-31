import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProjectModal = ({
    show,
    mode,
    project,
    loading,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "Planning",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name || "",
                description: project.description || "",
                start_date: project.start_date || "",
                end_date: project.end_date || "",
                status: project.status || "Planning",
            });
        } else {
            setFormData({
                name: "",
                description: "",
                start_date: "",
                end_date: "",
                status: "Planning",
            });
        }

        setErrors({});
    }, [project, show]);

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

        if (!formData.name.trim()) {
            validationErrors.name = "Project name is required.";
        }

        if (!formData.description.trim()) {
            validationErrors.description = "Description is required.";
        }

        if (!formData.start_date) {
            validationErrors.start_date = "Start date is required.";
        }

        if (!formData.end_date) {
            validationErrors.end_date = "End date is required.";
        }

        if (
            formData.start_date &&
            formData.end_date &&
            formData.start_date > formData.end_date
        ) {
            validationErrors.end_date =
                "End date cannot be earlier than Start date.";
        }

        if (!formData.status) {
            validationErrors.status = "Status is required.";
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
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                {mode === "edit"
                                    ? "Edit Project"
                                    : "Add Project"}
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
                                        Project Name
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? "is-invalid" : ""
                                            }`}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.name}
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
                                            Start Date
                                        </label>

                                        <input
                                            type="date"
                                            className={`form-control ${errors.start_date
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            name="start_date"
                                            value={formData.start_date}
                                            onChange={handleChange}
                                        />

                                        <div className="invalid-feedback">
                                            {errors.start_date}
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            End Date
                                        </label>

                                        <input
                                            type="date"
                                            className={`form-control ${errors.end_date
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            name="end_date"
                                            value={formData.end_date}
                                            onChange={handleChange}
                                        />

                                        <div className="invalid-feedback">
                                            {errors.end_date}
                                        </div>
                                    </div>

                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className={`form-select ${errors.status ? "is-invalid" : ""
                                            }`}
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Planning">
                                            Planning
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
                                            ? "Update Project"
                                            : "Create Project"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

ProjectModal.propTypes = {
    show: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(["add", "edit"]).isRequired,
    project: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default ProjectModal;