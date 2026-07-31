import PropTypes from "prop-types";

const TasksHeader = ({ onAddTask }) => {
    return (
        <div className="card mb-4 shadow-sm border-0">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <div>

                        <h2 className="fw-bold mb-1">

                            <i className="bi bi-list-task me-2 text-primary"></i>

                            Tasks

                        </h2>

                        <p className="text-muted mb-0">
                            Manage and track all project tasks from one place.
                        </p>

                    </div>

                    <button
                        className="btn btn-primary px-4"
                        onClick={onAddTask}
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Add Task

                    </button>

                </div>

            </div>

        </div>
    );
};

TasksHeader.propTypes = {
    onAddTask: PropTypes.func.isRequired,
};

export default TasksHeader;