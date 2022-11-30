import NoteItem from "./NoteItem";
import { useNotes } from "../../context/NoteContext";
import NoteCardsLayout from "../../material-ui/NoteCardsLayout";
import { useState, useEffect, useMemo } from "react";

export default function NoteList() {
    const [notes] = useNotes();
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [matchedNotes, setMatchedNotes] = useState(notes);
    const [matchedResults, setMatchedResults] = useState([]);
    const [updatedNotes, setUpdatedNotes] = useState(notes);
    const [noteIdsArr, setNoteIdsArr] = useState([]);
    const [isShownFilter, setIsShownFilter] = useState(true);
    const [isShownSearch, setIsShownSearch] = useState(true);
    const searchStr = JSON.parse(localStorage.getItem("searchStr"));
    const labelId = searchStr
        ? "all"
        : JSON.parse(localStorage.getItem("labelId"));

    useMemo(() => {
        setNoteIdsArr(
            notes
                .flatMap((note) => [
                    [
                        ...note.labels.filter(
                            (label) => label.id === labelId && label.isSelected
                        ),
                        note.id,
                    ],
                ])
                .filter((arr) => arr.length > 1)
                .flatMap((arr) => arr)
                .filter((el) => typeof el === "string")
        );

        setFilteredNotes(() => {
            return labelId !== "all" && noteIdsArr.length !== 0
                ? notes.filter((note) => noteIdsArr.includes(note.id))
                : notes;
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notes]);

    useEffect(() => {
        noteIdsArr.length !== 0 || labelId === "all"
            ? setIsShownFilter(true)
            : setIsShownFilter(false);
    }, [noteIdsArr, labelId]);

    useMemo(() => {
        setUpdatedNotes(filteredNotes);
    }, [filteredNotes]);

    useMemo(() => {
        setMatchedNotes(() => {
            setMatchedResults(
                notes.filter(({ title, body }) => {
                    const str = searchStr.toLowerCase().trim();

                    return (
                        title.toLowerCase().includes(str) ||
                        body.toLowerCase().includes(str)
                    );
                })
            );

            return searchStr && matchedResults.length !== 0
                ? matchedResults
                : notes;
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notes]);

    useEffect(() => {
        matchedResults.length !== 0
            ? setIsShownSearch(true)
            : setIsShownSearch(false);
    }, [matchedResults]);

    useMemo(() => {
        searchStr && setUpdatedNotes(matchedNotes);
    }, [searchStr, matchedNotes]);

    return (
        <NoteCardsLayout labelId={labelId}>
            {[...updatedNotes].reverse().map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    isShownFilter={!searchStr ? isShownFilter : undefined}
                    isShownSearch={searchStr ? isShownSearch : undefined}
                />
            ))}
        </NoteCardsLayout>
    );
}
