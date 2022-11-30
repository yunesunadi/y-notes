import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import { useBreakpointsDown } from "../../material-ui/custom_hooks/useBreakpoints";
import { useLabels, ACTION as labelACTION } from "../../context/LabelContext";
import { v4 as uuid } from "uuid";
import { useRef, useState } from "react";

export default function AddLabel() {
    const [labelName, setLabelName] = useState("");
    const [labels, labelDispatch] = useLabels();
    const inputRef = useRef(null);
    const matches = useBreakpointsDown();

    function handleSubmit(e) {
        e.preventDefault();
        inputRef.current.focus();
        setLabelName("");

        if (
            labelName !== "" &&
            labels.findIndex(({ name }) => name === labelName) === -1
        ) {
            labelDispatch({
                type: labelACTION.ADD,
                id: uuid(),
                name: labelName,
                isSelected: false,
            });
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            alignItems="center"
            columnGap={2}
        >
            <Input
                value={labelName}
                onChange={(e) => setLabelName(e.target.value)}
                inputRef={inputRef}
                placeholder="Create new label"
                inputProps={{
                    "aria-label": "label name",
                }}
                sx={{
                    fontSize: "text",
                    "&.MuiInput-root:hover::before": {
                        borderBottom: 1,
                        borderColor: "secondary.main",
                    },
                    "&.MuiInput-root::after": {
                        display: "none",
                    },
                    "& input::placeholder": {
                        fontSize: matches ? 13 : 15,
                    },
                }}
                fullWidth
            />
            <IconButton
                aria-label="add label"
                onClick={handleSubmit}
                sx={{ p: 0, mr: -0.4 }}
                disableRipple
            >
                <AddBoxTwoToneIcon
                    fontSize={matches ? "small" : "medium"}
                    color="primary"
                />
            </IconButton>
        </Box>
    );
}
