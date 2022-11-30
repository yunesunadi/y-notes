import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import LabelTwoToneIcon from "@mui/icons-material/LabelTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useBreakpointsDown } from "../../material-ui/custom_hooks/useBreakpoints";
import { useLabels, ACTION as labelACTION } from "../../context/LabelContext";

export default function LabelItem({ label }) {
    const [, labelDispatch] = useLabels();
    const matches = useBreakpointsDown();

    function handleDelete() {
        labelDispatch({ type: labelACTION.DELETE, id: label.id });
    }

    return (
        <ListItem
            dense
            disableGutters
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete label"
                    onClick={handleDelete}
                    disableRipple
                >
                    <DeleteTwoToneIcon
                        fontSize={matches ? "small" : "medium"}
                        color="error"
                    />
                </IconButton>
            }
        >
            <ListItemIcon sx={{ mr: matches ? -3 : -2 }}>
                <LabelTwoToneIcon
                    fontSize={matches ? "small" : "medium"}
                    color="primary"
                />
            </ListItemIcon>
            <ListItemText
                primaryTypographyProps={{
                    fontSize: matches ? 13 : 14,
                    color: "secondary.main",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                primary={label.name}
            />
        </ListItem>
    );
}
