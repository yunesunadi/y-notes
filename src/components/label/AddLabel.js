import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useLabels, ACTION as labelACTION } from "../../context/LabelContext";

export default function AddLabel() {
    const [labelName, setLabelName] = useState("");
    const [, labelDispatch] = useLabels();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        inputRef.current.focus();
        setLabelName("");

        labelName !== "" &&
            labelDispatch({
                type: labelACTION.ADD,
                id: uuid(),
                name: labelName,
                isSelected: false,
            });

        setTimeout(() => {
            navigate("/n");
            setTimeout(() => {
                navigate("/");
            }, 7);
        }, 5);
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <input
                type="text"
                value={labelName}
                ref={inputRef}
                onChange={(e) => setLabelName(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
