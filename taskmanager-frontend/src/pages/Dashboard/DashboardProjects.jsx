import PropTypes from "prop-types";

const DashboardProjects = ({ projects }) => {
    return (
        <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white">

                <h5 className="mb-0">
                    Project Summary
                </h5>

            </div>

            <div className="table-responsive">

                <table className="table table-hover mb-0">

                    <thead>

                        <tr>

                            <th>Project</th>

                            <th>Total Tasks</th>

                            <th>Completed</th>

                        </tr>

                    </thead>

                    <tbody>

                        {projects.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="text-center py-4"
                                >
                                    No Projects Found
                                </td>

                            </tr>

                        ) : (

                            projects.map((project) => (

                                <tr key={project.id}>

                                    <td>{project.name}</td>

                                    <td>{project.total_tasks}</td>

                                    <td>{project.completed_tasks}</td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

DashboardProjects.propTypes = {
    projects: PropTypes.array.isRequired,
};

export default DashboardProjects;