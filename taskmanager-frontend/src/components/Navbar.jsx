import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar navbar-expand-lg shadow-sm px-4">

            <h4 className="mb-0 fw-bold">
                Task Manager
            </h4>

            <div className="ms-auto d-flex align-items-center gap-3">

                <button
                    className="btn btn-outline-primary"
                    onClick={toggleTheme}
                >
                    {theme === "light" ? (
                        <>
                            🌙 Dark Mode
                        </>
                    ) : (
                        <>
                            ☀️ Light Mode
                        </>
                    )}
                </button>

                <span className="fw-semibold">
                    {user?.username}
                </span>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default Navbar;