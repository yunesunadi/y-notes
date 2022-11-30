import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useBreakpointsDown } from "./custom_hooks/useBreakpoints";

export default function DialogContainer({
    children,
    openDialog,
    handleDialogClose,
}) {
    const matches = useBreakpointsDown();

    return (
        <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            scroll="paper"
            aria-labelledby="scroll-dialog"
            aria-describedby="scroll-dialog"
            sx={{ maxWidth: 350, mx: "auto" }}
            disableScrollLock
        >
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
                <Button
                    onClick={handleDialogClose}
                    sx={{
                        fontSize: matches ? 12 : 14,
                        "&:hover": {
                            background: "transparent",
                        },
                    }}
                    disableRipple
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}
