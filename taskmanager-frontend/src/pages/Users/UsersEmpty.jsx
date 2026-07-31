import PropTypes from "prop-types";

const UsersEmpty = ({
    hasSearch,
    onAddUser,
}) => {
    return (
        <div className="card shadow-sm">

            <div className="card-body text-center py-5">

                <i
                    className="bi bi-people"
                    style={{
                        fontSize: "4rem",
                        color: "#6c757d",
                    }}
                />

                <h4 className="mt-3">

                    {hasSearch
                        ? "No Users Found"
                        : "No Users Available"}

                </h4>

                <p className="text-muted">

                    {hasSearch
                        ? "Try another search keyword."
                        : "Start by creating your first user."}

                </p>

                {!hasSearch && (

                    <button
                        className="btn btn-primary"
                        onClick={onAddUser}
                    >
                        <i className="bi bi-person-plus-fill me-2"></i>

                        Add User
                    </button>

                )}

            </div>

        </div>
    );
};

UsersEmpty.propTypes = {
    hasSearch: PropTypes.bool.isRequired,
    onAddUser: PropTypes.func.isRequired,
};

export default UsersEmpty;