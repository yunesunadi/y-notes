import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";
import TitleTextField from "../../material-ui/TitleTextField";
import DescriptionTextField from "../../material-ui/DescriptionTextField";
import { useBreakpointsDown } from "../../material-ui/custom_hooks/useBreakpoints";
import { useNotes, ACTION } from "../../context/NoteContext";
import { useLabels } from "../../context/LabelContext";
import SelectLabels from "../../material-ui/SelectLabels";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";

export default function AddNote() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [, dispatch] = useNotes();
    const [labels] = useLabels();
    const [checkedLabels, setCheckedLabels] = useState(labels);
    const navigate = useNavigate();
    const matches = useBreakpointsDown();

    useEffect(() => {
        setCheckedLabels(labels);
    }, [labels]);

    function handleClick() {
        if (title !== "" || body !== "") {
            dispatch({
                type: ACTION.ADD,
                id: uuid(),
                title,
                body,
                labels: checkedLabels,
                createdDate: format(new Date(), "h:mm a, d MMM y"),
                modifiedDate: format(new Date(), "h:mm a, d MMM y"),
            });

            setTimeout(() => {
                navigate("/notes");
                setTitle("");
                setBody("");
            }, 7);
        }
    }

    return (
        <Box pl={0.5} pb={2}>
            <Typography
                fontSize="title"
                fontWeight="medium"
                component="h2"
                color="secondary"
                mb={2}
            >
                Create A Note
            </Typography>
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                rowGap={2}
            >
                <TitleTextField
                    outlined={true}
                    title={title}
                    setTitle={setTitle}
                />
                <DescriptionTextField
                    outlined={true}
                    body={body}
                    setBody={setBody}
                />
                <SelectLabels
                    outlined={true}
                    action="addNote"
                    setCheckedLabels={setCheckedLabels}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<NoteAddTwoToneIcon />}
                    sx={{
                        width: matches ? 120 : 140,
                        "&:hover": {
                            bgcolor: "primary.main",
                        },
                    }}
                    disableRipple
                    disableElevation
                    onClick={handleClick}
                >
                    <Typography fontSize="text" fontWeight="medium">
                        Create
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}
