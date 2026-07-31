import { useEffect, useState } from "react";
import accountService from "../../services/accountService";
import "./Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
    });

    const [passwordData, setPasswordData] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);

            const response = await accountService.getProfile();

            const data = response.profile || response;

            setProfile(data);

            setFormData({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                email: data.email || "",
                phone: data.phone || "",
                department: data.department || "",
                designation: data.designation || "",
            });
        } catch (error) {
            console.error(error);
            alert("Unable to load profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await accountService.updateProfile(formData);

            setProfile(response.profile);

            alert("Profile updated successfully.");

            setEditing(false);
        } catch (error) {
            console.error(error);
            alert("Unable to update profile.");
        }
    };

    const handlePasswordInput = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (
            passwordData.new_password !==
            passwordData.confirm_password
        ) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await accountService.changePassword(passwordData);

            alert("Password changed successfully.");

            setPasswordData({
                old_password: "",
                new_password: "",
                confirm_password: "",
            });

        } catch (error) {
            console.error(error);

            if (error.response?.data?.error) {
                alert(error.response.data.error);
            } else {
                alert("Unable to change password.");
            }
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                <h3>Loading Profile...</h3>
            </div>
        );
    }

    return (
        <div className="container py-4">

            {/* Profile Card */}

            <div className="card shadow-lg border-0 mb-4">

                <div className="card-header profile-header">

                    <div className="d-flex align-items-center">

                        <div className="avatar-circle">
                            {profile.first_name
                                ? profile.first_name[0].toUpperCase()
                                : profile.username[0].toUpperCase()}
                        </div>

                        <div className="ms-3">

                            <h3 className="mb-0">
                                {profile.first_name} {profile.last_name}
                            </h3>

                            <small>
                                @{profile.username}
                            </small>

                        </div>

                    </div>

                    {!editing && (
                        <button
                            className="btn btn-light"
                            onClick={() => setEditing(true)}
                        >
                            Edit Profile
                        </button>
                    )}

                </div>

                <div className="card-body">

                    <form onSubmit={handleUpdate}>

                        <div className="row">

                            <div className="col-md-4 mb-3">
                                <label>Username</label>

                                <input
                                    className="form-control"
                                    value={profile.username}
                                    disabled
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Role</label>

                                <input
                                    className="form-control"
                                    value={profile.role}
                                    disabled
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Employee ID</label>

                                <input
                                    className="form-control"
                                    value={profile.employee_id || ""}
                                    disabled
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>First Name</label>

                                <input
                                    className="form-control"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Last Name</label>

                                <input
                                    className="form-control"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Email</label>

                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Phone</label>

                                <input
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Department</label>

                                <input
                                    className="form-control"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Designation</label>

                                <input
                                    className="form-control"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />
                            </div>

                        </div>

                        {editing && (

                            <div className="mt-3">

                                <button className="btn btn-success me-2">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setEditing(false);
                                        fetchProfile();
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        )}

                    </form>

                </div>

            </div>

            {/* Change Password */}

            <div className="card shadow-lg border-0">

                <div className="card-header bg-warning text-dark">

                    <h4 className="mb-0">
                        Change Password
                    </h4>

                </div>

                <div className="card-body">

                    <form onSubmit={handlePasswordChange}>

                        <div className="mb-3">

                            <label>Current Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="old_password"
                                value={passwordData.old_password}
                                onChange={handlePasswordInput}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>New Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="new_password"
                                value={passwordData.new_password}
                                onChange={handlePasswordInput}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                value={passwordData.confirm_password}
                                onChange={handlePasswordInput}
                                required
                            />

                        </div>

                        <button className="btn btn-warning">
                            Change Password
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Profile;