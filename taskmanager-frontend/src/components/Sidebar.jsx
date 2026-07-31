import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "bi-speedometer2",
        },
        {
            name: "Projects",
            path: "/projects",
            icon: "bi-kanban",
        },
        {
            name: "Tasks",
            path: "/tasks",
            icon: "bi-list-task",
        },
        {
            name: "AI Assistant",
            path: "/chat",
            icon: "bi-robot",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "bi-person-circle",
        },
        {
            name: "Users",
            path: "/users",
            icon: "bi bi-people-fill",
        }
    ];

    return (
        <div className="text-white p-3">

            <h3 className="mb-4 fw-bold">
                TM
            </h3>

            <ul className="nav flex-column">

                {menuItems.map((item) => (

                    <li
                        key={item.path}
                        className="nav-item mb-2"
                    >

                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center ${isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                                }`
                            }
                        >
                            <i className={`bi ${item.icon} me-2`}></i>

                            {item.name}

                        </NavLink>

                    </li>

                ))}

            </ul>

        </div>
    );
};

export default Sidebar;