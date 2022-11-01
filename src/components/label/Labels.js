import AddLabel from "./AddLabel";
import LabelList from "./LabelList";
import LabelsProvider from "../../context/LabelContext";

export default function Labels() {
    return (
        <LabelsProvider>
            <AddLabel />
            <LabelList />
        </LabelsProvider>
    );
}
