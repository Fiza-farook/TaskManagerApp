const ENDPOINTS = {
    // Authentication
    LOGIN: "/token/",
    REFRESH: "/token/refresh/",

    // Accounts
    REGISTER: "/accounts/register/",
    PROFILE: "/accounts/profile/",
    CHANGE_PASSWORD: "/accounts/change-password/",
    USERS: "/accounts/users/",

    // Projects
    PROJECTS: "/projects/",

    // Tasks
    TASKS: "/tasks/",

    // Dashboard
    DASHBOARD_STATS: "/dashboard/stats/",
    TASK_STATUS: "/dashboard/task-status/",
    PROJECT_SUMMARY: "/dashboard/project-summary/",
    RECENT_ACTIVITY: "/dashboard/recent-activity/",

    // AI Chat
    CHAT: "/chat/",
    CHAT_HISTORY: "/chat/history/",
    CLEAR_CHAT: "/chat/history/clear/",
    DOWNLOAD_CHAT: "/chat/export/pdf/",
};

export default ENDPOINTS;