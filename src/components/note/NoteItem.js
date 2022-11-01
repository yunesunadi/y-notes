import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useNotes, ACTION } from "../../context/NoteContext";
import { useLabels } from "../../context/LabelContext";

export default function NoteItem({ note }) {
    const [isShown, setIsShown] = useState(false);
    const [, dispatch] = useNotes();
    const [labels] = useLabels();
    const [checkedLabels, setCheckedLabels] = useState(note.labels);
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: ACTION.EDIT,
            note: {
                ...note,
                labels: checkedLabels,
            },
        });

        setCheckedLabels((prevLabels) =>
            prevLabels.length < labels.length
                ? [...prevLabels, labels[labels.length - 1]]
                : prevLabels
        );

        setCheckedLabels((prevLabels) =>
            prevLabels.length > labels.length
                ? prevLabels.filter((prevLabel) =>
                      labels.map(({ id }) => id).includes(prevLabel.id)
                  )
                : prevLabels
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedLabels]);

    useEffect(() => {
        handleEdit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, body]);

    function handleEdit() {
        dispatch({
            type: ACTION.EDIT,
            note:
                title !== note.title || body !== note.body
                    ? {
                          ...note,
                          title,
                          body,
                          modifiedDate: format(new Date(), "h:mm a, d MMM y"),
                      }
                    : { ...note, title, body },
        });
    }

    function handleDelete() {
        dispatch({ type: ACTION.DELETE, id: note.id });

        setTimeout(() => {
            navigate("/n");
            setTimeout(() => {
                navigate("/");
            }, 7);
        }, 5);
    }

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    handleEdit();
                }}
            />
            <br />
            <textarea
                cols="30"
                rows="10"
                value={body}
                onChange={(e) => {
                    setBody(e.target.value);
                    handleEdit();
                }}
            />
            <br />
            <br />
            {checkedLabels.map(
                ({ id, name, isSelected }) =>
                    isSelected && (
                        <span
                            key={id}
                            style={{
                                padding: "3px 5px",
                                marginRight: "10px",
                                border: "1px solid black",
                            }}
                        >
                            {name}
                        </span>
                    )
            )}
            <br />
            <br />
            <button onClick={() => setIsShown((prevState) => !prevState)}>
                Change Labels
            </button>
            <br />
            {isShown &&
                checkedLabels.map(({ id, name, isSelected }) => {
                    return (
                        <div key={id}>
                            <input
                                type="checkbox"
                                name="label"
                                id={id}
                                checked={isSelected}
                                onChange={() =>
                                    setCheckedLabels((prevLabels) =>
                                        prevLabels.map((prevLabel) =>
                                            prevLabel.id === id
                                                ? {
                                                      ...prevLabel,
                                                      isSelected:
                                                          !prevLabel.isSelected,
                                                  }
                                                : prevLabel
                                        )
                                    )
                                }
                            />
                            {name}
                        </div>
                    );
                })}
            <p>Last edited: {note.modifiedDate}</p>
            <p>Created: {note.createdDate}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}
