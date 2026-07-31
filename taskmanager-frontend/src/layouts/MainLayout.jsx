import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-2 bg-dark min-vh-100 p-0">
                    <Sidebar />
                </div>

                <div className="col-md-10 p-0">

                    <Navbar />

                    <div className="p-4">
                        <Outlet />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default MainLayout;