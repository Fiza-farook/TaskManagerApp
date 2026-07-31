import PropTypes from "prop-types";

const TasksEmpty = ({ onAddTask }) => {
    return (
        <div className="card border-0 shadow-sm">

            <div className="card-body text-center py-5">

                <i
                    className="bi bi-list-task text-muted"
                    style={{ fontSize: "4rem" }}
                ></i>

                <h4 className="mt-4 fw-bold">
                    No Tasks Found
                </h4>

                <p className="text-muted mb-4">
                    There are no tasks available. Create your first task to get started.
                </p>

                <button
                    className="btn btn-primary"
                    onClick={onAddTask}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Task
                </button>

            </div>

        </div>
    );
};

TasksEmpty.propTypes = {
    onAddTask: PropTypes.func.isRequired,
};

export default TasksEmpty;