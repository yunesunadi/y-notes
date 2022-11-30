import IconButton from "@mui/material/IconButton";
import TuneTwoToneIcon from "@mui/icons-material/TuneTwoTone";
import useDialog from "./custom_hooks/useDialog";
import FilterDialog from "./FilterDialog";

export default function FilterIcon({ setSearchValue }) {
    const [openDialog, handleDialogOpen, handleDialogClose] = useDialog();

    function handleClick() {
        handleDialogOpen();
        setSearchValue("");
    }

    return (
        <>
            <IconButton
                aria-label="filter"
                onClick={handleClick}
                sx={{
                    bgcolor: "primary.main",
                    color: "background.main",
                    borderRadius: 3,
                    p: { xs: 0.8, sm: 1.3 },
                    ml: { xs: 1.3, sm: 0 },
                }}
                disableRipple
            >
                <TuneTwoToneIcon fontSize="small" />
            </IconButton>
            <FilterDialog
                openDialog={openDialog}
                handleDialogClose={handleDialogClose}
            />
        </>
    );
}
