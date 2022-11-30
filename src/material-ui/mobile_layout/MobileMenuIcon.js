import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function MobileMenuIcon({ handleMobileDrawer }) {
    return (
        <IconButton
            aria-label="open drawer"
            onClick={handleMobileDrawer}
            sx={{
                display: { sm: "none" },
                bgcolor: "primary.main",
                color: "background.main",
                p: 0.8,
                borderRadius: 3,
            }}
            disableRipple
        >
            <MenuIcon fontSize="small" />
        </IconButton>
    );
}

export default MobileMenuIcon;
