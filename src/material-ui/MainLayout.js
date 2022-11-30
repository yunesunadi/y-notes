import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function MainLayout({ children }) {
    return (
        <Box
            component="main"
            sx={{
                pt: { xs: 1.5, sm: 2 },
                px: { xs: 1.3, sm: 2 },
                marginLeft: { xl: `calc(50vw - 770px)` },
                marginRight: { xs: 2, sm: 0, xl: `calc(50vw - 770px)` },
                width: "100%",
            }}
        >
            <Toolbar />
            {children}
        </Box>
    );
}
