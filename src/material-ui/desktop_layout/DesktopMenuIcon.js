import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function DesktopMenuIcon({ handleDesktopDrawer }) {
    return (
        <IconButton
            aria-label="open drawer"
            onClick={handleDesktopDrawer}
            edge="start"
            sx={{
                ml: "auto",
                mr: 2.5,
                my: 0.5,
                display: { xs: "none", sm: "block" },
                bgcolor: "primary.main",
                color: "background.main",
                pb: 0.3,
                borderRadius: 3,
            }}
            disableRipple
        >
            <MenuIcon />
        </IconButton>
    );
}
