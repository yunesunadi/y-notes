import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import AddLabel from "../components/label/AddLabel";
import { useLabels } from "../context/LabelContext";
import LabelItem from "../components/label/LabelItem";
import DialogContainer from "./DialogContainer";

export default function LabelDialog({ openDialog, handleDialogClose }) {
    const [labels] = useLabels();

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
                Edit Labels
            </Typography>
            <AddLabel />
            <List>
                {[...labels].reverse().map((label) => (
                    <LabelItem key={label.id} label={label} />
                ))}
            </List>
        </DialogContainer>
    );
}
