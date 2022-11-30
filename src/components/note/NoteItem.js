import { useNotes, ACTION } from "../../context/NoteContext";
import NoteCard from "../../material-ui/NoteCard";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function NoteItem({ note, isShownFilter, isShownSearch }) {
    const [, dispatch] = useNotes();
    const [checkedLabels, setCheckedLabels] = useState(note.labels);
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);
    const labels = JSON.parse(localStorage.getItem("labels")) || [];
    const labelsLength = labels ? labels.length : 0;

    useEffect(() => {
        dispatch({
            type: ACTION.EDIT,
            note: {
                ...note,
                labels: checkedLabels,
            },
        });

        setCheckedLabels((prevLabels) =>
            prevLabels.length > labelsLength
                ? prevLabels.filter((prevLabel) =>
                      labels.map(({ id }) => id).includes(prevLabel.id)
                  )
                : prevLabels
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labels]);

    useEffect(() => {
        handleEdit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, body]);

    useEffect(() => {
        handleEditLabels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedLabels]);

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

    function handleEditTitle(value) {
        setTitle(value);
        handleEdit();
    }

    function handleEditBody(value) {
        setBody(value);
        handleEdit();
    }

    function handleEditLabels() {
        dispatch({
            type: ACTION.EDIT,
            note: {
                ...note,
                labels: checkedLabels,
            },
        });
    }

    function handleDelete() {
        dispatch({ type: ACTION.DELETE, id: note.id });
    }

    return (
        <NoteCard
            note={note}
            handleEditTitle={handleEditTitle}
            handleEditBody={handleEditBody}
            setEditCheckedLabels={setCheckedLabels}
            handleEditLabels={handleEditLabels}
            handleDelete={handleDelete}
            isShownFilter={isShownFilter}
            isShownSearch={isShownSearch}
        />
    );
}
