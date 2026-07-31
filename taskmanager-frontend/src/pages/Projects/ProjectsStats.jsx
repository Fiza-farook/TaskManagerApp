import PropTypes from "prop-types";

const ProjectsStats = ({ projects }) => {
    const stats = [
        {
            title: "Total Projects",
            value: projects.length,
            icon: "bi-folder2-open",
            bg: "linear-gradient(135deg,#6366F1,#3B82F6)",
        },
        {
            title: "Planning",
            value: projects.filter(
                (p) => p.status?.toLowerCase() === "planning"
            ).length,
            icon: "bi-pencil-square",
            bg: "linear-gradient(135deg,#F59E0B,#FBBF24)",
        },
        {
            title: "In Progress",
            value: projects.filter(
                (p) => p.status?.toLowerCase() === "in progress"
            ).length,
            icon: "bi-rocket-takeoff",
            bg: "linear-gradient(135deg,#0EA5E9,#2563EB)",
        },
        {
            title: "Completed",
            value: projects.filter(
                (p) => p.status?.toLowerCase() === "completed"
            ).length,
            icon: "bi-check-circle-fill",
            bg: "linear-gradient(135deg,#10B981,#22C55E)",
        },
    ];

    return (
        <div className="row g-4 mb-4">

            {stats.map((stat) => (

                <div
                    className="col-lg-3 col-md-6"
                    key={stat.title}
                >

                    <div
                        className="project-stat-card"
                        style={{
                            background: stat.bg,
                        }}
                    >

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h6 className="text-white opacity-75 mb-2">

                                    {stat.title}

                                </h6>

                                <h2 className="text-white fw-bold">

                                    {stat.value}

                                </h2>

                            </div>

                            <div className="project-stat-icon">

                                <i
                                    className={`bi ${stat.icon}`}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
};

ProjectsStats.propTypes = {
    projects: PropTypes.array.isRequired,
};

export default ProjectsStats;