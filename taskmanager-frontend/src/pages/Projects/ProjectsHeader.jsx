import PropTypes from "prop-types";

const ProjectsHeader = ({ onAddProject }) => {
    return (
        <div className="card mb-4 shadow-sm border-0">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <div>

                        <h2 className="fw-bold mb-1">

                            <i className="bi bi-folder2-open me-2 text-primary"></i>

                            Projects

                        </h2>

                        <p className="text-muted mb-0">
                            Manage all your organization projects from one place.
                        </p>

                    </div>

                    <button
                        className="btn btn-primary px-4"
                        onClick={onAddProject}
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Add Project

                    </button>

                </div>

            </div>

        </div>
    );
};

ProjectsHeader.propTypes = {
    onAddProject: PropTypes.func.isRequired,
};

export default ProjectsHeader;