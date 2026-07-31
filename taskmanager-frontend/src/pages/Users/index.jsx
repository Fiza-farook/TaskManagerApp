import { useEffect, useMemo, useState } from "react";

import userService from "../../services/userService";

import UsersHeader from "./UsersHeader";
import UsersStats from "./UsersStats";
import UsersSearch from "./UsersSearch";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import UsersEmpty from "./UsersEmpty";

import ConfirmModal from "../../components/ConfirmModal";
import ToastNotification from "../../components/ToastNotification";

const Users = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [userToDelete, setUserToDelete] = useState(null);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            setLoading(true);

            const data = await userService.getUsers();

            setUsers(data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Failed to load users.");

        } finally {

            setLoading(false);

        }

    };

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const keyword = searchTerm.toLowerCase();

            return (

                user.username?.toLowerCase().includes(keyword)

                ||

                user.first_name?.toLowerCase().includes(keyword)

                ||

                user.last_name?.toLowerCase().includes(keyword)

                ||

                user.email?.toLowerCase().includes(keyword)

                ||

                user.role?.toLowerCase().includes(keyword)

            );

        });

    }, [users, searchTerm]);

    const openAddModal = () => {

        setSelectedUser(null);

        setShowModal(true);

    };

    const openEditModal = (user) => {

        setSelectedUser(user);

        setShowModal(true);

    };

    const closeModal = () => {

        setSelectedUser(null);

        setShowModal(false);

    };

    const handleSave = async (formData) => {

        try {

            if (selectedUser) {

                await userService.updateUser(
                    selectedUser.id,
                    formData
                );

                setToast({
                    show: true,
                    message: "User updated successfully.",
                    type: "success",
                });

            } else {

                await userService.createUser(formData);

                setToast({
                    show: true,
                    message: "User created successfully.",
                    type: "success",
                });

            }

            closeModal();

            loadUsers();

        } catch (err) {

            console.error(err);

            setToast({
                show: true,
                message: "Operation failed.",
                type: "danger",
            });

        }

    };

    const openDeleteModal = (user) => {

        setUserToDelete(user);

        setShowDeleteModal(true);

    };

    const handleDelete = async () => {

        if (!userToDelete) return;

        try {

            await userService.deleteUser(userToDelete.id);

            setToast({
                show: true,
                message: "User deleted successfully.",
                type: "success",
            });

            loadUsers();

        } catch (err) {

            console.error(err);

            setToast({
                show: true,
                message: "Delete failed.",
                type: "danger",
            });

        } finally {

            setShowDeleteModal(false);

            setUserToDelete(null);

        }

    };

    return (

        <div className="container-fluid py-4">

            <UsersHeader
                onAddUser={openAddModal}
            />

            <UsersStats
                users={users}
            />

            <UsersSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClearSearch={() => setSearchTerm("")}
            />

            {

                loading ?

                    (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                            />

                        </div>

                    )

                    :

                    error ?

                        (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )

                        :

                        filteredUsers.length === 0 ?

                            (

                                <UsersEmpty
                                    hasSearch={
                                        searchTerm.trim() !== ""
                                    }
                                    onAddUser={openAddModal}
                                />

                            )

                            :

                            (

                                <UsersTable
                                    users={filteredUsers}
                                    onEdit={openEditModal}
                                    onDelete={openDeleteModal}
                                />

                            )

            }

            <UserModal
                show={showModal}
                mode={selectedUser ? "edit" : "add"}
                user={selectedUser}
                loading={loading}
                onClose={closeModal}
                onSave={handleSave}
            />

            <ConfirmModal
                show={showDeleteModal}
                title="Delete User"
                message={`Are you sure you want to delete "${userToDelete?.username || ""}"?`}
                onConfirm={handleDelete}
                onCancel={() => {

                    setShowDeleteModal(false);

                    setUserToDelete(null);

                }}
            />

            <ToastNotification
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() =>
                    setToast((prev) => ({
                        ...prev,
                        show: false,
                    }))
                }
            />

        </div>

    );

};

export default Users;