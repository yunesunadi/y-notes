import { useBreakpointsDown } from "./useBreakpoints";
import { useState } from "react";

export default function useDialog(handleMobileDrawer = undefined) {
    const [openDialog, setOpenDialog] = useState(false);
    const matches = useBreakpointsDown();

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);

        if (matches && handleMobileDrawer !== undefined) {
            handleMobileDrawer();
        }
    };

    return [openDialog, handleDialogOpen, handleDialogClose];
}
