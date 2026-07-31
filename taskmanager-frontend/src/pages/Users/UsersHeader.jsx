import PropTypes from "prop-types";

const UsersHeader = ({ onAddUser }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
                <h2 className="fw-bold mb-1">
                    User Management
                </h2>

                <p className="text-muted mb-0">
                    Manage employees, managers and administrators.
                </p>
            </div>

            <button
                className="btn btn-primary"
                onClick={onAddUser}
            >
                <i className="bi bi-person-plus-fill me-2"></i>
                Add User
            </button>

        </div>
    );
};

UsersHeader.propTypes = {
    onAddUser: PropTypes.func.isRequired,
};

export default UsersHeader;