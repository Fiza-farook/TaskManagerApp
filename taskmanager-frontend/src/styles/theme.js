import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#7C3AED",
        },

        secondary: {
            main: "#2563EB",
        },

        success: {
            main: "#22C55E",
        },

        warning: {
            main: "#F59E0B",
        },

        error: {
            main: "#EF4444",
        },

        info: {
            main: "#3B82F6",
        },

        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF",
        },

        text: {
            primary: "#1F2937",
            secondary: "#6B7280",
        },
    },

    typography: {
        fontFamily: "Poppins, sans-serif",

        h3: {
            fontWeight: 700,
        },

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

        h6: {
            fontWeight: 600,
        },

        button: {
            fontWeight: 600,
            textTransform: "none",
        },
    },

    shape: {
        borderRadius: 14,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: "10px 18px",
                    boxShadow: "none",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 18,
                    boxShadow: "0 8px 24px rgba(0,0,0,.06)",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },
    },
});

export default theme;