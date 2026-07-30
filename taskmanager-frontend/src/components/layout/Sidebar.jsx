import {
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Box,
    Avatar,
} from "@mui/material";

import {
    DashboardCustomize,
    Workspaces,
    TaskAlt,
    SmartToy,
    ManageAccounts,
    LogoutRounded,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const drawerWidth = 270;

const menuItems = [
    {
        title: "Dashboard",
        icon: <DashboardCustomize />,
        path: "/dashboard",
    },
    {
        title: "Projects",
        icon: <Workspaces />,
        path: "/projects",
    },
    {
        title: "Tasks",
        icon: <TaskAlt />,
        path: "/tasks",
    },
    {
        title: "Chatbot",
        icon: <SmartToy />,
        path: "/chat",
    },
    {
        title: "Profile",
        icon: <ManageAccounts />,
        path: "/profile",
    },
];

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#111827",
                    color: "#fff",
                    borderRight: "none",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            {/* Header */}
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    py: 2,
                    px: 3,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "#FFFFFF",
                    }}
                >
                    Task Manager
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#94A3B8",
                        mt: 0.5,
                    }}
                >
                    Project & Task Management
                </Typography>
            </Toolbar>

            <Divider sx={{ borderColor: "#1F2937" }} />

            {/* Navigation */}
            <List sx={{ mt: 2, px: 1 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.title}
                        component={NavLink}
                        to={item.path}
                        sx={{
                            borderRadius: 3,
                            mx: 1,
                            my: 1,
                            color: "#CBD5E1",
                            transition: "all 0.25s ease",

                            "& .MuiListItemIcon-root": {
                                color: "#CBD5E1",
                                minWidth: 40,
                                transition: "all 0.25s ease",
                            },

                            "&.active": {
                                backgroundColor: "#7C3AED",
                                color: "#FFFFFF",
                                boxShadow: "0 8px 18px rgba(124,58,237,.30)",
                            },

                            "&.active .MuiListItemIcon-root": {
                                color: "#FFFFFF",
                            },

                            "&:hover": {
                                backgroundColor: "rgba(124,58,237,.12)",
                                transform: "translateX(4px)",
                            },
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>

                        <ListItemText
                            primary={item.title}
                            primaryTypographyProps={{
                                fontSize: "0.95rem",
                                fontWeight: 500,
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider sx={{ borderColor: "#1F2937" }} />

            {/* User Section */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 3,
                    py: 2,
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: "#7C3AED",
                        width: 46,
                        height: 46,
                        fontWeight: 700,
                    }}
                >
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                </Avatar>

                <Box>
                    <Typography
                        sx={{
                            color: "#FFFFFF",
                            fontWeight: 600,
                        }}
                    >
                        {user?.username || "Guest"}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#94A3B8",
                            textTransform: "capitalize",
                        }}
                    >
                        {user?.role || "Not Assigned"}
                    </Typography>
                </Box>
            </Box>

            {/* Logout */}
            <List sx={{ px: 1, pb: 2 }}>
                <ListItemButton
                    onClick={logout}
                    sx={{
                        borderRadius: 3,
                        color: "#F87171",
                        transition: "all 0.25s ease",

                        "& .MuiListItemIcon-root": {
                            color: "#F87171",
                        },

                        "&:hover": {
                            backgroundColor: "rgba(239,68,68,.15)",
                            transform: "translateX(4px)",
                        },
                    }}
                >
                    <ListItemIcon>
                        <LogoutRounded />
                    </ListItemIcon>

                    <ListItemText
                        primary="Logout"
                        primaryTypographyProps={{
                            fontWeight: 500,
                        }}
                    />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Sidebar;