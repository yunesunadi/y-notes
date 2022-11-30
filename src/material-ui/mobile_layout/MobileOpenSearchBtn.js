import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function MobileOpenSearchBtn({ handleSearch }) {
    return (
        <IconButton
            aria-label="open search box"
            onClick={handleSearch}
            sx={{
                display: { sm: "none" },
                bgcolor: "primary.main",
                color: "background.main",
                p: 0.8,
                borderRadius: 3,
            }}
            disableRipple
        >
            <SearchIcon fontSize="small" />
        </IconButton>
    );
}
