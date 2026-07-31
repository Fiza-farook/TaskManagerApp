import PropTypes from "prop-types";

const UsersSearch = ({
    searchTerm,
    onSearchChange,
    onClearSearch,
}) => {
    return (
        <div className="card shadow-sm border-0 mb-4">

            <div className="card-body">

                <div className="input-group">

                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by username, name, email or role..."
                        value={searchTerm}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                    />

                    {searchTerm && (
                        <button
                            className="btn btn-outline-secondary"
                            onClick={onClearSearch}
                        >
                            Clear
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
};

UsersSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
};

export default UsersSearch;