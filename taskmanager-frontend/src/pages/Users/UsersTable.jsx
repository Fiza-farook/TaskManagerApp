import PropTypes from "prop-types";

const UsersTable = ({
    users,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="card shadow-sm border-0">

            <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Phone</th>
                            <th width="170">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user, index) => (

                            <tr key={user.id}>

                                <td>{index + 1}</td>

                                <td>
                                    <strong>{user.username}</strong>
                                </td>

                                <td>
                                    {user.first_name} {user.last_name}
                                </td>

                                <td>{user.email}</td>

                                <td>

                                    <span
                                        className={`badge ${user.role === "Admin"
                                                ? "bg-danger"
                                                : user.role === "Manager"
                                                    ? "bg-warning text-dark"
                                                    : "bg-primary"
                                            }`}
                                    >
                                        {user.role}
                                    </span>

                                </td>

                                <td>
                                    {user.department || "-"}
                                </td>

                                <td>
                                    {user.designation || "-"}
                                </td>

                                <td>
                                    {user.phone || "-"}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => onEdit(user)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => onDelete(user)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UsersTable;