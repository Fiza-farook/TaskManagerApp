import PropTypes from "prop-types";

const DashboardStats = ({ stats }) => {
    const cards = [
        {
            title: "Projects",
            value: stats.projects?.total || 0,
            color: "primary",
            icon: "bi-kanban",
        },
        {
            title: "Tasks",
            value: stats.tasks?.total || 0,
            color: "info",
            icon: "bi-list-task",
        },
        {
            title: "Completed",
            value: stats.tasks?.completed || 0,
            color: "success",
            icon: "bi-check-circle",
        },
        {
            title: "Pending",
            value: stats.tasks?.pending || 0,
            color: "warning",
            icon: "bi-hourglass-split",
        },
        {
            title: "Overdue",
            value: stats.tasks?.overdue || 0,
            color: "danger",
            icon: "bi-exclamation-circle",
        },
    ];

    return (
        <div className="row g-4 mb-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="col-lg col-md-4 col-sm-6"
                >
                    <div className={`card border-0 shadow-sm bg-${card.color} text-white`}>
                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>
                                    <small>{card.title}</small>

                                    <h2 className="fw-bold mt-2">
                                        {card.value}
                                    </h2>
                                </div>

                                <i className={`bi ${card.icon} display-6 opacity-75`}></i>

                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

DashboardStats.propTypes = {
    stats: PropTypes.object.isRequired,
};

export default DashboardStats;