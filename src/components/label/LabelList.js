import LabelItem from "./LabelItem";
import { useLabels } from "../../context/LabelContext";

export default function LabelList() {
    const [labels] = useLabels();

    const labelItemElements = [...labels]
        .reverse()
        .map((label) => <LabelItem key={label.id} label={label} />);

    return <div>{labelItemElements}</div>;
}
