import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useBreakpointsDown } from "./custom_hooks/useBreakpoints";
import SelectLabels from "./SelectLabels";
import EditNoteLayout from "./EditNoteLayout";
import useDialog from "./custom_hooks/useDialog";
import { useState } from "react";

export default function NoteCard({
    note,
    handleEditTitle,
    handleEditBody,
    setEditCheckedLabels,
    handleEditLabels,
    handleDelete,
    isShownFilter,
    isShownSearch,
}) {
    const [openDialog, handleDialogOpen, handleDialogClose] = useDialog();
    const [expanded, setExpanded] = useState(false);
    const matches = useBreakpointsDown();
    const { title, body: description, labels } = note;

    const handleExpandClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    function truncateStr(str, len) {
        return str.length >= len
            ? str.substring(0, len) + "..."
            : str.substring(0, len);
    }

    return (
        <Card
            sx={{
                width: "100%",
                display: isShownFilter || isShownSearch ? "block" : "none",
                visibility:
                    isShownFilter || isShownSearch ? "visible" : "hidden",
            }}
        >
            <CardHeader
                action={
                    <Box>
                        <IconButton
                            aria-label="edit note"
                            onClick={handleDialogOpen}
                            disableRipple
                        >
                            <EditTwoToneIcon
                                color="primary"
                                fontSize={matches ? "small" : "medium"}
                            />
                        </IconButton>
                        <EditNoteLayout
                            openDialog={openDialog}
                            handleDialogClose={handleDialogClose}
                            note={note}
                            handleEditTitle={handleEditTitle}
                            handleEditBody={handleEditBody}
                            setEditCheckedLabels={setEditCheckedLabels}
                            handleEditLabels={handleEditLabels}
                            handleDelete={handleDelete}
                        />
                    </Box>
                }
                title={
                    <Typography
                        fontSize="title"
                        fontWeight="medium"
                        component="h3"
                        color="secondary"
                    >
                        {truncateStr(title, 50)}
                    </Typography>
                }
                sx={{ pb: 0 }}
            />
            <CardContent sx={{ pb: 0 }}>
                <Typography fontSize="text" color="secondary">
                    {truncateStr(description, 200)}
                </Typography>
            </CardContent>
            <CardContent sx={{ pb: 0 }}>
                <SelectLabels
                    outlined={false}
                    action="noteCard"
                    noteLabels={labels}
                    setEditCheckedLabels={setEditCheckedLabels}
                    handleEditLabels={handleEditLabels}
                />
            </CardContent>
            <CardActions sx={{ pt: 0 }} disableSpacing>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ ml: "auto" }}
                    disableRipple
                >
                    <MoreVertIcon color="primary" />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ pt: 0 }}>
                    <IconButton
                        aria-label="delete note"
                        sx={{
                            width: "100%",
                            bgcolor: "error.main",
                            color: "background.main",
                            borderRadius: 3,
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
                </CardContent>
            </Collapse>
        </Card>
    );
}
