import IconButton from "@mui/material/IconButton";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function MobileCloseSearchBtn({ handleSearch }) {
    return (
        <IconButton
            aria-label="close search box"
            onClick={handleSearch}
            sx={{
                ml: "auto",
                display: { sm: "none" },
                bgcolor: "primary.main",
                color: "background.main",
                p: 0.8,
                borderRadius: 3,
            }}
            disableRipple
        >
            <SearchOffIcon fontSize="small" />
        </IconButton>
    );
}
