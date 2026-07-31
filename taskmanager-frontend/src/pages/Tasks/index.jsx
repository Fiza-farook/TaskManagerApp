import { useEffect, useMemo, useState } from "react";
import "./Task.css";

import TasksHeader from "./TasksHeader";
import TasksStats from "./TasksStats";
import TasksSearch from "./TasksSearch";
import TasksTable from "./TasksTable";
import TasksEmpty from "./TasksEmpty";
import TaskModal from "./TaskModal";

import taskService from "../../services/taskService";
import projectService from "../../services/projectService";
import userService from "../../services/userService";

import { toast } from "react-toastify";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [selectedTask, setSelectedTask] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setPageLoading(true);

            const [tasksData, projectsData, usersData] =
                await Promise.all([
                    taskService.getTasks(),
                    projectService.getProjects(),
                    userService.getUsers(),
                ]);

            console.log("Tasks:", tasksData);
            console.log("Projects:", projectsData);
            console.log("Users:", usersData);
            ;

            setProjects(projectsData);
            setUsers(usersData);

            const enrichedTasks = tasksData.map((task) => ({
                ...task,
                projectName:
                    projectsData.find(
                        (p) => p.id === task.project
                    )?.name || "-",

                assignedUserName:
                    usersData.find(
                        (u) => u.id === task.assigned_to
                    )?.username || "-",
            }));

            setTasks(enrichedTasks);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load tasks.");
        } finally {
            setPageLoading(false);
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const search = searchTerm.toLowerCase();

            return (
                task.title.toLowerCase().includes(search) ||
                task.description
                    ?.toLowerCase()
                    .includes(search) ||
                task.projectName
                    ?.toLowerCase()
                    .includes(search) ||
                task.assignedUserName
                    ?.toLowerCase()
                    .includes(search) ||
                task.status.toLowerCase().includes(search)
            );
        });
    }, [tasks, searchTerm]);

    const totalPages = Math.ceil(
        filteredTasks.length / itemsPerPage
    );

    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const openAddModal = () => {
        setModalMode("add");
        setSelectedTask(null);
        setShowModal(true);
    };

    const openEditModal = (task) => {
        setModalMode("edit");
        setSelectedTask(task);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTask(null);
    };

    const handleSave = async (formData) => {
        try {
            setLoading(true);

            if (modalMode === "add") {
                await taskService.createTask(formData);
                toast.success("Task created successfully.");
            } else {
                await taskService.updateTask(
                    selectedTask.id,
                    formData
                );
                toast.success("Task updated successfully.");
            }

            closeModal();
            await loadData();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save task.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (task) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (!confirmDelete) return;

        try {
            await taskService.deleteTask(task.id);

            toast.success("Task deleted successfully.");

            await loadData();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete task.");
        }
    };

    if (pageLoading) {
        return (
            <div className="container-fluid py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3">Loading Tasks...</p>
            </div>
        );
    }

    return (
        <div className="container-fluid task-page">

            <TasksHeader
                onAddTask={openAddModal}
            />

            <TasksStats
                tasks={tasks}
            />

            <TasksSearch
                searchTerm={searchTerm}
                onSearchChange={(value) => {
                    setSearchTerm(value);
                    setCurrentPage(1);
                }}
                onClearSearch={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                }}
            />
            {filteredTasks.length === 0 ? (
                <TasksEmpty
                    onAddTask={openAddModal}
                />
            ) : (
                <>
                    <TasksTable
                        tasks={paginatedTasks}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />

                    {totalPages > 1 && (
                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">

                                <li
                                    className={`page-item ${currentPage === 1
                                        ? "disabled"
                                        : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(prev - 1, 1)
                                            )
                                        }
                                    >
                                        Previous
                                    </button>
                                </li>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <li
                                            key={index + 1}
                                            className={`page-item ${currentPage === index + 1
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() =>
                                                    setCurrentPage(index + 1)
                                                }
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    )
                                )}

                                <li
                                    className={`page-item ${currentPage === totalPages
                                        ? "disabled"
                                        : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(
                                                    prev + 1,
                                                    totalPages
                                                )
                                            )
                                        }
                                    >
                                        Next
                                    </button>
                                </li>

                            </ul>
                        </nav>
                    )}
                </>
            )}

            <TaskModal
                show={showModal}
                mode={modalMode}
                task={selectedTask}
                projects={projects}
                users={users}
                loading={loading}
                onClose={closeModal}
                onSave={handleSave}
            />

        </div>
    );
};

export default Tasks;