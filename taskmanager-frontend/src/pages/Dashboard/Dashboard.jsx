import PropTypes from "prop-types";

const DashboardHeader = ({ onRefresh, loading }) => {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="dashboard-header card shadow-sm border-0 mb-4">

            <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

                <div>

                    <h2 className="fw-bold mb-1">
                        Dashboard
                    </h2>

                    <p className="text-muted mb-0">
                        Welcome back! Here's your project overview.
                    </p>

                    <small className="text-secondary">
                        {today}
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={onRefresh}
                    disabled={loading}
                >
                    <i className="bi bi-arrow-clockwise me-2"></i>

                    {loading ? "Refreshing..." : "Refresh"}
                </button>

            </div>

        </div>
    );
};

DashboardHeader.propTypes = {
    onRefresh: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default DashboardHeader;