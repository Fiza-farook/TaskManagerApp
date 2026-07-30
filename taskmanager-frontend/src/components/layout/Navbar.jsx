import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import {
    NotificationsNoneRounded,
    DarkModeRounded,
    LogoutRounded,
    PersonOutlineRounded,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const pageTitles = {
    "/dashboard": "Dashboard",
    "/projects": "Projects",
    "/tasks": "Tasks",
    "/chat": "Chatbot",
    "/profile": "Profile",
};

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate("/");
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "#FFFFFF",
                color: "#1F2937",
                borderBottom: "1px solid #E5E7EB",
                ml: "270px",
                width: "calc(100% - 270px)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Page Title */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    {pageTitles[location.pathname] || "Task Manager"}
                </Typography>

                {/* Right Side */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <IconButton>
                        <DarkModeRounded />
                    </IconButton>

                    <IconButton>
                        <NotificationsNoneRounded />
                    </IconButton>

                    <IconButton onClick={handleMenuOpen}>
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                width: 40,
                                height: 40,
                                fontWeight: 700,
                            }}
                        >
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                mt: 1.5,
                                minWidth: 230,
                                borderRadius: 3,
                                boxShadow:
                                    "0 10px 30px rgba(0,0,0,0.12)",
                            },
                        }}
                    >
                        {/* User Info */}
                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                            }}
                        >
                            <Typography
                                fontWeight={600}
                                color="text.primary"
                            >
                                {user?.username || "Guest"}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textTransform: "capitalize" }}
                            >
                                {user?.role || "Not Assigned"}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Profile */}
                        <MenuItem
                            onClick={() => {
                                navigate("/profile");
                                handleClose();
                            }}
                        >
                            <ListItemIcon>
                                <PersonOutlineRounded fontSize="small" />
                            </ListItemIcon>

                            <ListItemText primary="Profile" />
                        </MenuItem>

                        {/* Logout */}
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutRounded
                                    fontSize="small"
                                    color="error"
                                />
                            </ListItemIcon>

                            <ListItemText primary="Logout" />
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;