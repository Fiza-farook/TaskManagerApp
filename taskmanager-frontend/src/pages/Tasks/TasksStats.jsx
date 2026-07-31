import PropTypes from "prop-types";

const TasksStats = ({ tasks }) => {
    const today = new Date();

    const stats = [
        {
            title: "Total Tasks",
            value: tasks.length,
            icon: "bi-list-task",
            bg: "linear-gradient(135deg,#6366F1,#3B82F6)",
        },
        {
            title: "Pending",
            value: tasks.filter(
                (task) => task.status?.toLowerCase() === "pending"
            ).length,
            icon: "bi-hourglass-split",
            bg: "linear-gradient(135deg,#F59E0B,#FBBF24)",
        },
        {
            title: "Completed",
            value: tasks.filter(
                (task) => task.status?.toLowerCase() === "completed"
            ).length,
            icon: "bi-check-circle-fill",
            bg: "linear-gradient(135deg,#10B981,#22C55E)",
        },
        {
            title: "Overdue",
            value: tasks.filter((task) => {
                if (!task.deadline) return false;

                return (
                    task.status?.toLowerCase() !== "completed" &&
                    new Date(task.deadline) < today
                );
            }).length,
            icon: "bi-exclamation-triangle-fill",
            bg: "linear-gradient(135deg,#EF4444,#DC2626)",
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

TasksStats.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default TasksStats;