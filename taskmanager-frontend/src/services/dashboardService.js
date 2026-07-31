import api from "../api/axios";

const dashboardService = {
    // Dashboard Statistics
    getStatistics: async () => {
        const response = await api.get("/dashboard/stats/");
        return response.data;
    },

    // Task Status Distribution
    getTaskStatus: async () => {
        const response = await api.get("/dashboard/task-status/");
        return response.data;
    },

    // Project Summary
    getProjectSummary: async () => {
        const response = await api.get("/dashboard/project-summary/");
        return response.data;
    },

    // Recent Activity
    getRecentActivity: async () => {
        const response = await api.get("/dashboard/recent-activity/");
        return response.data;
    },
    getWorkload: async () => {
        const response = await api.get("/dashboard/workload/");
        return response.data;
    },
};

export default dashboardService;