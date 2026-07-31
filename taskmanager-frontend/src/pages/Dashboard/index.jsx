import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./Dashboard.css";

import dashboardService from "../../services/dashboardService";

import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import DashboardProjects from "./DashboardProjects";
import DashboardRecentActivity from "./DashboardRecentActivity";
import DashboardWorkload from "./DashboardWorkload";

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [taskStatus, setTaskStatus] = useState([]);
    const [projects, setProjects] = useState([]);
    const [activities, setActivities] = useState([]);
    const [workload, setWorkload] = useState([]);

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setPageLoading(true);

            const [
                statsData,
                taskStatusData,
                projectSummaryData,
                recentActivityData,
                workloadData,
            ] = await Promise.all([
                dashboardService.getStatistics(),
                dashboardService.getTaskStatus(),
                dashboardService.getProjectSummary(),
                dashboardService.getRecentActivity(),
                dashboardService.getWorkload(),
            ]);

            setStats(statsData);
            setTaskStatus(taskStatusData);
            setProjects(projectSummaryData);
            setActivities(recentActivityData);
            setWorkload(workloadData);

        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard.");
        } finally {
            setLoading(false);
            setPageLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="dashboard-spinner">
                <div className="spinner-border text-primary">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid dashboard-page">

            <DashboardHeader
                loading={loading}
                onRefresh={loadDashboard}
            />

            <DashboardStats
                stats={stats}
            />

            {/* Charts Row */}

            <div className="row g-4">

                <div className="col-lg-6">
                    <DashboardCharts
                        taskStatus={taskStatus}
                    />
                </div>

                <div className="col-lg-6">
                    <DashboardProjects
                        projects={projects}
                    />
                </div>

            </div>

            {/* Workload */}

            <div className="row mt-4">

                <div className="col-lg-12">

                    <DashboardWorkload
                        workload={workload}
                    />

                </div>

            </div>

            {/* Recent Activity */}

            <div className="mt-4">

                <DashboardRecentActivity
                    activities={activities}
                />

            </div>

        </div>
    );
};

export default Dashboard;