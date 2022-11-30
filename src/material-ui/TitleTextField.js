import TextField from "@mui/material/TextField";
import {
    useBreakpointsDown,
    useBreakpointsMdDown,
} from "./custom_hooks/useBreakpoints";
import getTextFieldStyles from "./getTextFieldStyles";
import { useRef } from "react";

export default function TitleTextField({
    outlined,
    title,
    setTitle,
    action,
    noteTitle,
    handleEditTitle,
}) {
    const matches = useBreakpointsDown();
    const matchesMd = useBreakpointsMdDown();
    const inputRef = useRef();

    return (
        <TextField
            value={action === "edited" ? noteTitle : title}
            inputRef={action === "edited" ? inputRef : undefined}
            onChange={(e) =>
                action === "edited"
                    ? handleEditTitle(inputRef.current.value)
                    : setTitle(e.target.value)
            }
            label={outlined ? "Title" : undefined}
            placeholder={outlined ? "Enter title" : "Title"}
            variant="outlined"
            autoComplete="off"
            sx={{
                ...getTextFieldStyles(matches, matchesMd, outlined),
                "& fieldset": {
                    border: !outlined ? "none" : undefined,
                },
                "& .MuiInputLabel-root": {
                    marginTop: matches && outlined ? -0.5 : "auto",
                },
            }}
        />
    );
}
