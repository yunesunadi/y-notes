import { useState, useEffect } from "react";
import NoteItem from "./NoteItem";
import { useNotes } from "../../context/NoteContext";
import { useLabels } from "../../context/LabelContext";

export default function NoteList() {
    const [notes] = useNotes();
    const [labels] = useLabels();
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [checkedId, setCheckedId] = useState("all");
    const [searchStr, setSearchStr] = useState("");

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchStr]);

    useEffect(() => {
        handleFilter(checkedId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedId]);

    function handleSearch() {
        setFilteredNotes(
            searchStr
                ? notes.filter(({ title, body }) => {
                      const str = searchStr.toLowerCase().trim();
                      return (
                          title.toLowerCase().includes(str) ||
                          body.toLowerCase().includes(str)
                      );
                  })
                : notes
        );
        searchStr && setCheckedId("all");
    }

    function handleFilter(id) {
        const noteIdsArr = notes
            .flatMap((note) => [
                [
                    ...note.labels.filter(
                        (label) => label.id === id && label.isSelected
                    ),
                    note.id,
                ],
            ])
            .filter((arr) => arr.length > 1)
            .flatMap((arr) => arr)
            .filter((el) => typeof el === "string");

        setFilteredNotes(
            id !== "all"
                ? notes.filter((note) => noteIdsArr.includes(note.id))
                : notes
        );

        setCheckedId(id);
        id !== "all" && setSearchStr("");
    }

    const noteItemElements = [...filteredNotes]
        .reverse()
        .map((note) => <NoteItem key={note.id} note={note} />);

    return (
        <>
            <div style={{ marginBottom: "20px" }}>
                <label htmlFor="search-notes">Search: </label>
                <input
                    type="text"
                    name="search-notes"
                    id="search-notes"
                    value={searchStr}
                    onChange={(e) => {
                        setSearchStr(e.target.value);
                        handleSearch();
                    }}
                />
            </div>
            <div style={{ marginBottom: "20px" }}>
                {[{ id: "all", name: "All" }, ...labels].map(({ id, name }) => (
                    <label
                        key={id}
                        style={{
                            padding: "3px 5px",
                            marginRight: "10px",
                            border: "1px solid black",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="radio"
                            name="label"
                            id={id}
                            onChange={() => handleFilter(id)}
                            checked={checkedId === id}
                        />
                        {name}
                    </label>
                ))}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
                {noteItemElements}
            </div>
        </>
    );
}
