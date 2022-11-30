import NotesIcon from "@mui/icons-material/Notes";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import LabelDialog from "../LabelDialog";
import { useBreakpointsDown } from "./useBreakpoints";

export default function useListItems(openDialog, handleDialogClose) {
    const matches = useBreakpointsDown();

    return [
        {
            icon: (
                <NotesIcon
                    fontSize={matches ? "small" : "medium"}
                    color="primary"
                />
            ),
            textLabel: "Notes",
            url: "/notes",
        },
        {
            icon: (
                <NoteAddTwoToneIcon
                    fontSize={matches ? "small" : "medium"}
                    color="primary"
                />
            ),
            textLabel: "Create Note",
            url: "/create",
        },
        {
            icon: (
                <EditTwoToneIcon
                    fontSize={matches ? "small" : "medium"}
                    color="primary"
                />
            ),
            textLabel: "Edit Labels",
            labelDialog: (
                <LabelDialog
                    openDialog={openDialog}
                    handleDialogClose={handleDialogClose}
                />
            ),
        },
    ];
}
