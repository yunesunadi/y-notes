import { useNavigate } from "react-router-dom";
import { useLabels, ACTION as labelACTION } from "../../context/LabelContext";

export default function LabelItem({ label }) {
    const [, labelDispatch] = useLabels();
    const navigate = useNavigate();

    function handleDelete() {
        labelDispatch({ type: labelACTION.DELETE, id: label.id });

        setTimeout(() => {
            navigate("/n");
            setTimeout(() => {
                navigate("/");
            }, 7);
        }, 5);
    }

    return (
        <div style={{ marginBottom: 20 }}>
            <span style={{ marginRight: "20px" }}>{label.name}</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}
