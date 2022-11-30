import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LabelTwoToneIcon from "@mui/icons-material/LabelTwoTone";
import DialogContainer from "./DialogContainer";
import { useBreakpointsDown } from "./custom_hooks/useBreakpoints";
import { useState } from "react";

export default function FilterDialog({ openDialog, handleDialogClose }) {
    const labels = JSON.parse(localStorage.getItem("labels")) || [];
    const updatedLabels = [{ id: "all", name: "All Results" }, ...labels];
    const [labelId, setLabelId] = useState("all");
    const matches = useBreakpointsDown();

    const handleChange = (event) => {
        const id = updatedLabels.find(
            ({ name }) => name === event.target.value
        ).id;
        setLabelId(id);
    };

    localStorage.setItem("labelId", JSON.stringify(labelId));

    return (
        <DialogContainer
            openDialog={openDialog}
            handleDialogClose={handleDialogClose}
        >
            <Typography
                fontSize="title"
                fontWeight="medium"
                component="h2"
                color="secondary"
            >
                Filter
            </Typography>
            <FormControl>
                <RadioGroup
                    aria-labelledby="radio-buttons-group"
                    name="radio-buttons-group"
                    value={updatedLabels.find(({ id }) => id === labelId).name}
                    onChange={handleChange}
                >
                    {updatedLabels.map(({ id, name }) => (
                        <FormControlLabel
                            key={id}
                            value={name}
                            control={
                                <Radio
                                    size={matches ? "small" : "medium"}
                                    color="primary"
                                    disableRipple
                                />
                            }
                            label={
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={matches ? 0.5 : 0.7}
                                >
                                    {id !== "all" && (
                                        <LabelTwoToneIcon
                                            fontSize={
                                                matches ? "small" : "medium"
                                            }
                                            color="primary"
                                        />
                                    )}
                                    <Typography
                                        sx={{
                                            fontSize: matches ? 13 : 14,
                                            color: "secondary.main",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {name}
                                    </Typography>
                                </Stack>
                            }
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </DialogContainer>
    );
}
