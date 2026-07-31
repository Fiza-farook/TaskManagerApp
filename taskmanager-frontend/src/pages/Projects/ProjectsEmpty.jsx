import PropTypes from "prop-types";

const ProjectsEmpty = ({
    hasSearch,
    onAddProject,
}) => {
    return (
        <div className="card border-0 shadow-sm">

            <div className="card-body text-center py-5 empty-state">

                <div className="mb-4">

                    <i
                        className="bi bi-folder-x text-secondary"
                        style={{
                            fontSize: "80px",
                        }}
                    ></i>

                </div>

                <h3 className="fw-bold mb-3">

                    {hasSearch
                        ? "No Matching Projects"
                        : "No Projects Available"}

                </h3>

                <p
                    className="text-muted mb-4"
                    style={{
                        maxWidth: "500px",
                        margin: "0 auto",
                    }}
                >

                    {hasSearch
                        ? "No projects matched your search. Try using different keywords."
                        : "You haven't created any projects yet. Click the button below to create your first project."}

                </p>

                {!hasSearch && (

                    <button
                        className="btn btn-primary px-4"
                        onClick={onAddProject}
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Create First Project

                    </button>

                )}

            </div>

        </div>
    );
};

ProjectsEmpty.propTypes = {

    hasSearch: PropTypes.bool.isRequired,

    onAddProject: PropTypes.func.isRequired,

};

export default ProjectsEmpty;