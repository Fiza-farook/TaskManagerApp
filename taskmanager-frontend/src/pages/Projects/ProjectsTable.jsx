import PropTypes from "prop-types";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 10;

const ProjectsTable = ({ projects, onEdit, onDelete }) => {
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const sortedProjects = useMemo(() => {
        return [...projects].sort((a, b) => {
            const aValue = a[sortField] ?? "";
            const bValue = b[sortField] ?? "";

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;

            return 0;
        });
    }, [projects, sortField, sortOrder]);

    const totalPages = Math.ceil(
        sortedProjects.length / ITEMS_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE;

    const paginatedProjects =
        sortedProjects.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

    const badgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case "planning":
                return "warning";
            case "in progress":
                return "primary";
            case "completed":
                return "success";
            default:
                return "secondary";
        }
    };

    return (
        <div className="card border-0 shadow-sm">

            <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th
                                className="sortable"
                                onClick={() => handleSort("name")}
                            >
                                Project
                                <i className="bi bi-arrow-down-up ms-2"></i>
                            </th>

                            <th>Description</th>

                            <th
                                className="sortable"
                                onClick={() => handleSort("start_date")}
                            >
                                Start
                                <i className="bi bi-arrow-down-up ms-2"></i>
                            </th>

                            <th
                                className="sortable"
                                onClick={() => handleSort("end_date")}
                            >
                                End
                                <i className="bi bi-arrow-down-up ms-2"></i>
                            </th>

                            <th>Status</th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {paginatedProjects.map((project, index) => (

                            <tr key={project.id}>

                                <td>
                                    {startIndex + index + 1}
                                </td>

                                <td className="fw-semibold">
                                    {project.name}
                                </td>

                                <td>{project.description}</td>

                                <td>{project.start_date}</td>

                                <td>{project.end_date}</td>

                                <td>

                                    <span
                                        className={`badge bg-${badgeColor(
                                            project.status
                                        )}`}
                                    >
                                        {project.status}
                                    </span>

                                </td>

                                <td className="text-center">

                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => onEdit(project)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onDelete(project)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className="card-footer bg-white">

                <div className="d-flex justify-content-between align-items-center flex-wrap">

                    <small className="text-muted">

                        Showing{" "}
                        {sortedProjects.length === 0
                            ? 0
                            : startIndex + 1}

                        -

                        {Math.min(
                            startIndex + ITEMS_PER_PAGE,
                            sortedProjects.length
                        )}

                        {" "}of{" "}
                        {sortedProjects.length} projects

                    </small>

                    <nav>

                        <ul className="pagination mb-0">

                            <li
                                className={`page-item ${currentPage === 1
                                        ? "disabled"
                                        : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage - 1
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
                                        key={index}
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
                                className={`page-item ${currentPage === totalPages ||
                                        totalPages === 0
                                        ? "disabled"
                                        : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage + 1
                                        )
                                    }
                                >
                                    Next
                                </button>
                            </li>

                        </ul>

                    </nav>

                </div>

            </div>

        </div>
    );
};

ProjectsTable.propTypes = {
    projects: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ProjectsTable;