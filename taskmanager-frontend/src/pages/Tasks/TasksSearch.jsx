import PropTypes from "prop-types";

const TasksSearch = ({ searchTerm, onSearchChange, onClearSearch }) => {
    return (
        <div className="card border-0 shadow-sm mb-4">

            <div className="card-body">

                <div className="row align-items-center">

                    <div className="col-md-8">

                        <div className="input-group">

                            <span className="input-group-text bg-white border-end-0">

                                <i className="bi bi-search text-muted"></i>

                            </span>

                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) =>
                                    onSearchChange(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className="col-md-4 text-md-end mt-3 mt-md-0">

                        {searchTerm && (

                            <button
                                className="btn btn-outline-secondary"
                                onClick={onClearSearch}
                            >

                                <i className="bi bi-x-circle me-2"></i>

                                Clear

                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

TasksSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
};

export default TasksSearch;