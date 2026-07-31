import PropTypes from "prop-types";

const UsersStats = ({ users }) => {

    const admins = users.filter(
        user => user.role === "Admin"
    ).length;

    const managers = users.filter(
        user => user.role === "Manager"
    ).length;

    const interns = users.filter(
        user => user.role === "Intern"
    ).length;

    return (

        <div className="row mb-4">

            <div className="col-md-3">

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <h6>Total Users</h6>

                        <h2>
                            {users.length}
                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <h6>Admins</h6>

                        <h2 className="text-danger">
                            {admins}
                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <h6>Managers</h6>

                        <h2 className="text-warning">
                            {managers}
                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <h6>Interns</h6>

                        <h2 className="text-primary">
                            {interns}
                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );
};

UsersStats.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UsersStats;