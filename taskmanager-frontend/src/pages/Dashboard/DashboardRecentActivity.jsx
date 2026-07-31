import PropTypes from "prop-types";

const DashboardRecentActivity = ({ activities }) => {
    return (
        <div className="card border-0 shadow-sm">

            <div className="card-header bg-white">
                <h5 className="mb-0">
                    Recent Activity
                </h5>
            </div>

            <div className="list-group list-group-flush">

                {activities.length === 0 ? (

                    <div className="p-4 text-center text-muted">
                        No Recent Activity
                    </div>

                ) : (

                    activities.map((activity) => (

                        <div
                            key={activity.task_id}
                            className="list-group-item"
                        >

                            <div className="fw-semibold">
                                {activity.title}
                            </div>

                            <small className="text-muted d-block">
                                Project: {activity.project}
                            </small>

                            <small className="text-muted d-block">
                                Assigned To: {activity.assigned_to}
                            </small>

                            <small className="text-muted d-block">
                                Status: {activity.status}
                            </small>

                            <small className="text-muted d-block">
                                Deadline: {activity.deadline}
                            </small>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

DashboardRecentActivity.propTypes = {
    activities: PropTypes.array.isRequired,
};

export default DashboardRecentActivity;