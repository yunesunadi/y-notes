import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import TitleTextField from "./TitleTextField";
import DescriptionTextField from "./DescriptionTextField";
import SelectLabels from "./SelectLabels";
import { useBreakpointsDown } from "./custom_hooks/useBreakpoints";
import { useState } from "react";

export default function EditNoteLayout({
    openDialog,
    handleDialogClose,
    note,
    handleEditTitle,
    handleEditBody,
    setEditCheckedLabels,
    handleEditLabels,
    handleDelete,
}) {
    const [expanded, setExpanded] = useState(false);
    const matches = useBreakpointsDown();

    const handleExpandClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            scroll="paper"
            fullScreen={matches}
            aria-labelledby="responsive-dialog"
            PaperProps={{
                style: { width: "100%" },
            }}
        >
            {matches && (
                <DialogTitle id="responsive-dialog" sx={{ pt: 0.8, pb: 1.2 }}>
                    <IconButton
                        aria-label="back"
                        onClick={handleDialogClose}
                        sx={{ p: 0 }}
                        disableRipple
                    >
                        <ArrowBackIosIcon fontSize="small" color="primary" />
                    </IconButton>
                </DialogTitle>
            )}
            <DialogContent sx={{ pb: { sm: 0 } }}>
                <TitleTextField
                    outlined={false}
                    action="edited"
                    noteTitle={note.title}
                    handleEditTitle={handleEditTitle}
                />
                <DescriptionTextField
                    outlined={false}
                    action="edited"
                    noteDescription={note.body}
                    handleEditBody={handleEditBody}
                />
                <SelectLabels
                    outlined={false}
                    action="edited"
                    noteLabels={note.labels}
                    setEditCheckedLabels={setEditCheckedLabels}
                    handleEditLabels={handleEditLabels}
                />
                <Stack
                    spacing={0.5}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                >
                    <Stack>
                        <Typography fontSize="text" color="secondary">
                            Last edited at {note.modifiedDate}
                        </Typography>
                        <Typography fontSize="text" color="secondary">
                            Created at {note.createdDate}
                        </Typography>
                    </Stack>
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        sx={{ p: 0 }}
                        disableRipple
                    >
                        <MoreVertIcon color="primary" />
                    </IconButton>
                </Stack>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <IconButton
                        aria-label="delete note"
                        sx={{
                            width: "100%",
                            bgcolor: "error.main",
                            color: "background.main",
                            borderRadius: 3,
                            mt: 1.5,
                        }}
                        disableRipple
                        onClick={handleDelete}
                    >
                        <DeleteTwoToneIcon
                            fontSize={matches ? "small" : "medium"}
                        />
                        <Typography
                            fontSize="text"
                            fontWeight="medium"
                            color="background"
                            ml={0.3}
                        >
                            Delete Note
                        </Typography>
                    </IconButton>
                </Collapse>
            </DialogContent>
            {!matches && (
                <DialogActions>
                    <Button
                        onClick={handleDialogClose}
                        disableRipple
                        sx={{
                            "&:hover": {
                                background: "transparent",
                            },
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}
