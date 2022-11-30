import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import LabelTwoToneIcon from "@mui/icons-material/LabelTwoTone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    useBreakpointsDown,
    useBreakpointsMdDown,
} from "./custom_hooks/useBreakpoints";
import { useState } from "react";

export default function SelectLabels({
    outlined,
    setCheckedLabels,
    action,
    noteLabels,
    setEditCheckedLabels,
    handleEditLabels,
}) {
    const [searchValue, setSearchValue] = useState("");
    const labels = JSON.parse(localStorage.getItem("labels")) || [];
    const matches = useBreakpointsDown();
    const matchesMd = useBreakpointsMdDown();
    let textfieldWidth;
    let value;

    if (action === "noteCard" || action === "edited") {
        value = noteLabels.filter(({ isSelected }) => isSelected);
    } else {
        value = undefined;
    }

    if (outlined) {
        textfieldWidth = matches
            ? `calc(100vw - 27px)`
            : matchesMd
            ? `calc(100vw - 246px)`
            : 550;
    } else {
        textfieldWidth = "100%";
    }

    function checkLabels(prevLabels, targetText) {
        const index = labels.length - prevLabels.length;
        let newLabels = [];

        for (let i = index; i >= 1; i--) {
            newLabels.push(labels[labels.length - i]);
        }

        const updatedLabels =
            index !== 0 ? [...prevLabels, ...newLabels] : [...prevLabels];

        return updatedLabels.map((label) =>
            label.name === targetText
                ? {
                      ...label,
                      isSelected: !label.isSelected,
                  }
                : label
        );
    }

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={labels}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <Box
                    component="li"
                    key={option.id}
                    onClick={() => setSearchValue("")}
                >
                    <Box {...props}>
                        <Checkbox
                            icon={
                                <CheckBoxOutlineBlankIcon
                                    color="primary"
                                    fontSize="small"
                                />
                            }
                            checkedIcon={
                                <CheckBoxTwoToneIcon
                                    color="primary"
                                    fontSize="small"
                                />
                            }
                            style={{ marginRight: 3 }}
                            checked={selected}
                        />
                        <Typography color="secondary" fontSize="text">
                            {option.name}
                        </Typography>
                    </Box>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={outlined ? "Labels" : undefined}
                    placeholder="Enter label name"
                    sx={{
                        width: textfieldWidth,
                        "& input, & label": {
                            fontSize: "text",
                        },
                        "& input::placeholder": {
                            fontSize: "text",
                        },
                        "& .MuiAutocomplete-popupIndicator": {
                            display: outlined ? "inline-flex" : "none",
                        },
                    }}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            )}
            ChipProps={{
                icon: (
                    <LabelTwoToneIcon
                        fontSize={matches ? "small" : "medium"}
                        color="primary"
                    />
                ),

                style: {
                    fontSize: matches ? 11.45 : 13,
                    height: matches ? 28 : 33,
                    margin: 0,
                    marginRight: "5px",
                },
            }}
            value={value}
            inputValue={searchValue}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{
                "& .MuiChip-filled": {
                    color: "secondary.main",
                },
                "& .MuiInputBase-input": {
                    fontSize: "text",
                    color: "secondary.main",
                },
                "& .MuiChip-deleteIcon": {
                    display: "none",
                },
                "& fieldset": {
                    border: !outlined ? "none" : "auto",
                },
                "& .MuiOutlinedInput-input": {
                    paddingLeft: !outlined ? "0px !important" : "auto",
                    paddingRight: !outlined ? "0px !important" : "auto",
                },
                "& .MuiInputBase-root": {
                    padding: !outlined ? "0px !important" : "auto",
                },
                "& .MuiOutlinedInput-root": {
                    paddingTop: outlined && matches ? "4px !important" : "auto",
                    paddingBottom:
                        outlined && matches ? "4px !important" : "auto",
                },
                "& .MuiInputLabel-root": {
                    marginTop: matches ? -0.5 : "auto",
                },
                "& .MuiChip-label": {
                    marginLeft: -0.5,
                },
            }}
            noOptionsText="No matches"
            disableClearable={outlined ? false : true}
            onChange={(event) => {
                let targetText = "";

                if (event.target.type === "checkbox") {
                    targetText = event.target.parentNode.parentNode.innerText;
                } else {
                    targetText = event.target.innerText;
                }

                if (action === "edited" || action === "noteCard") {
                    setEditCheckedLabels((prevLabels) =>
                        checkLabels(prevLabels, targetText)
                    );

                    handleEditLabels();
                } else {
                    setCheckedLabels((prevLabels) =>
                        checkLabels(prevLabels, targetText)
                    );
                }
            }}
        />
    );
}
