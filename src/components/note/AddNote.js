import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { useNotes, ACTION } from "../../context/NoteContext";
import { useLabels } from "../../context/LabelContext";

export default function AddNote() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [, dispatch] = useNotes();
    const [labels] = useLabels();
    const [checkedLabels, setCheckedLabels] = useState(labels);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (title !== "" || body !== "") {
            dispatch({
                type: ACTION.ADD,
                id: uuid(),
                title,
                body,
                labels: checkedLabels,
                createdDate: format(new Date(), "h:mm a, d MMM y"),
                modifiedDate: format(new Date(), "h:mm a, d MMM y"),
            });
        }

        setCheckedLabels((prevLabels) =>
            prevLabels.map((label) => ({ ...label, isSelected: false }))
        );

        setTimeout(() => {
            navigate("/");
            setTitle("");
            setBody("");
        }, 7);
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <textarea
                cols="30"
                rows="10"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <br />
            <br />
            {checkedLabels.map(
                (label) =>
                    label.isSelected && (
                        <span
                            key={label.id}
                            style={{
                                padding: "3px 5px",
                                marginRight: "10px",
                                border: "1px solid black",
                            }}
                        >
                            {label.name}
                        </span>
                    )
            )}
            <br />
            <br />
            {checkedLabels.map((label) => (
                <label key={label.id} htmlFor={label.id}>
                    <input
                        type="checkbox"
                        name="label"
                        id={label.id}
                        onChange={() => {
                            setCheckedLabels((prevLabels) =>
                                prevLabels.map((lbl) =>
                                    lbl.id === label.id
                                        ? {
                                              ...lbl,
                                              isSelected: !lbl.isSelected,
                                          }
                                        : lbl
                                )
                            );
                        }}
                    />
                    {label.name}
                </label>
            ))}
            <br />
            <br />
            <button>Add</button>
        </form>
    );
}
