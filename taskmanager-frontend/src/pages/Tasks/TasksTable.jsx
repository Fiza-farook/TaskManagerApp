import PropTypes from "prop-types";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 10;

const TasksTable = ({ tasks, onEdit, onDelete }) => {
    const [sortField, setSortField] = useState("title");
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

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            const aValue = a[sortField] ?? "";
            const bValue = b[sortField] ?? "";

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [tasks, sortField, sortOrder]);

    const totalPages = Math.ceil(sortedTasks.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const paginatedTasks = sortedTasks.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const badgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
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
                                onClick={() => handleSort("title")}
                            >
                                Task
                                <i className="bi bi-arrow-down-up ms-2"></i>
                            </th>

                            <th>Project</th>

                            <th>Assigned To</th>

                            <th
                                className="sortable"
                                onClick={() => handleSort("deadline")}
                            >
                                Deadline
                                <i className="bi bi-arrow-down-up ms-2"></i>
                            </th>

                            <th>Status</th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {paginatedTasks.map((task, index) => (

                            <tr key={task.id}>

                                <td>
                                    {startIndex + index + 1}
                                </td>

                                <td className="fw-semibold">
                                    {task.title}
                                </td>

                                <td>
                                    {task.projectName}
                                </td>

                                <td>
                                    {task.assignedUserName}
                                </td>

                                <td>
                                    {task.deadline}
                                </td>

                                <td>

                                    <span
                                        className={`badge bg-${badgeColor(task.status)}`}
                                    >
                                        {task.status}
                                    </span>

                                </td>

                                <td className="text-center">

                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => onEdit(task)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onDelete(task)}
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

                        {sortedTasks.length === 0
                            ? 0
                            : startIndex + 1}

                        -

                        {Math.min(
                            startIndex + ITEMS_PER_PAGE,
                            sortedTasks.length
                        )}

                        {" "}of{" "}

                        {sortedTasks.length} tasks

                    </small>

                    <nav>

                        <ul className="pagination mb-0">

                            <li
                                className={`page-item ${
                                    currentPage === 1
                                        ? "disabled"
                                        : ""
                                }`}
                            >

                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
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
                                        className={`page-item ${
                                            currentPage === index + 1
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
                                className={`page-item ${
                                    currentPage === totalPages ||
                                    totalPages === 0
                                        ? "disabled"
                                        : ""
                                }`}
                            >

                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
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

TasksTable.propTypes = {
    tasks: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TasksTable;