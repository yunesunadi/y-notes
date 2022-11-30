import TextField from "@mui/material/TextField";
import {
    useBreakpointsDown,
    useBreakpointsMdDown,
} from "./custom_hooks/useBreakpoints";
import getTextFieldStyles from "./getTextFieldStyles";
import { useRef } from "react";

export default function DescriptionTextField({
    outlined,
    body: description,
    setBody,
    action,
    noteDescription,
    handleEditBody,
}) {
    const matches = useBreakpointsDown();
    const matchesMd = useBreakpointsMdDown();
    const inputRef = useRef();

    return (
        <TextField
            value={action === "edited" ? noteDescription : description}
            inputRef={action === "edited" ? inputRef : undefined}
            onChange={(e) =>
                action === "edited"
                    ? handleEditBody(inputRef.current.value)
                    : setBody(e.target.value)
            }
            label={outlined ? "Description" : undefined}
            multiline
            minRows={outlined ? 5 : undefined}
            placeholder={outlined ? "Enter description" : "Description"}
            autoComplete="off"
            sx={{
                ...getTextFieldStyles(matches, matchesMd, outlined),
                "& fieldset": {
                    border: !outlined ? "none" : "auto",
                },
                "& .MuiInputBase-multiline": {
                    padding: outlined ? "11.5px" : 0,
                    marginBottom: !outlined ? "20px" : "auto",
                },
            }}
        />
    );
}
