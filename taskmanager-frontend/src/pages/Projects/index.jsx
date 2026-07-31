import { useEffect, useMemo, useState } from "react";

import projectService from "../../services/projectService";

import ProjectsHeader from "./ProjectsHeader";
import ProjectsStats from "./ProjectsStats";
import ProjectsSearch from "./ProjectsSearch";
import ProjectsTable from "./ProjectsTable";
import ProjectsEmpty from "./ProjectsEmpty";
import ProjectModal from "./ProjectModal";

import ConfirmModal from "../../components/ConfirmModal";
import ToastNotification from "../../components/ToastNotification";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);

            const data = await projectService.getProjects();

            setProjects(data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const keyword = searchTerm.toLowerCase();

            return (
                project.name?.toLowerCase().includes(keyword) ||
                project.description?.toLowerCase().includes(keyword) ||
                project.status?.toLowerCase().includes(keyword)
            );
        });
    }, [projects, searchTerm]);

    const openAddModal = () => {
        setSelectedProject(null);
        setShowModal(true);
    };

    const openEditModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedProject(null);
        setShowModal(false);
    };

    const handleSave = async (formData) => {
        try {
            if (selectedProject) {
                await projectService.updateProject(
                    selectedProject.id,
                    formData
                );

                setToast({
                    show: true,
                    message: "Project updated successfully.",
                    type: "success",
                });
            } else {
                await projectService.createProject(formData);

                setToast({
                    show: true,
                    message: "Project created successfully.",
                    type: "success",
                });
            }

            closeModal();
            loadProjects();
        } catch (err) {
            console.error(err);

            setToast({
                show: true,
                message: "Operation failed.",
                type: "danger",
            });
        }
    };

    const openDeleteModal = (project) => {
        setProjectToDelete(project);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!projectToDelete) return;

        try {
            await projectService.deleteProject(projectToDelete.id);

            setToast({
                show: true,
                message: "Project deleted successfully.",
                type: "success",
            });

            loadProjects();
        } catch (err) {
            console.error(err);

            setToast({
                show: true,
                message: "Delete failed.",
                type: "danger",
            });
        } finally {
            setShowDeleteModal(false);
            setProjectToDelete(null);
        }
    };

    return (
        <div className="container-fluid py-4">

            <ProjectsHeader
                onAddProject={openAddModal}
            />

            <ProjectsStats
                projects={projects}
            />

            <ProjectsSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClearSearch={() => setSearchTerm("")}
            />

            {loading ? (

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                </div>

            ) : error ? (

                <div className="alert alert-danger">
                    {error}
                </div>

            ) : filteredProjects.length === 0 ? (

                <ProjectsEmpty
                    hasSearch={searchTerm.trim() !== ""}
                    onAddProject={openAddModal}
                />

            ) : (

                <ProjectsTable
                    projects={filteredProjects}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                />

            )}

            <ProjectModal
                show={showModal}
                mode={selectedProject ? "edit" : "add"}
                project={selectedProject}
                loading={loading}
                onClose={closeModal}
                onSave={handleSave}
            />

            <ConfirmModal
                show={showDeleteModal}
                title="Delete Project"
                message={`Are you sure you want to delete "${projectToDelete?.name || ""
                    }"?`}
                onConfirm={handleDelete}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setProjectToDelete(null);
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

export default Projects;