import { createContext, useContext, useReducer } from "react";

const notesContext = createContext(null);
const notesDispatchContext = createContext(null);

export function useNotes() {
    const notes = useContext(notesContext);
    const dispatch = useContext(notesDispatchContext);
    return [notes, dispatch];
}

export const ACTION = {
    ADD: "add",
    EDIT: "edit",
    DELETE: "delete",
};

function saveItems(newNotes) {
    localStorage.setItem("notes", JSON.stringify(newNotes));
}

function notesReducer(notes, action) {
    switch (action.type) {
        case ACTION.ADD: {
            const newNotes = [
                ...notes,
                {
                    id: action.id,
                    title: action.title,
                    body: action.body,
                    labels: action.labels,
                    createdDate: action.createdDate,
                    modifiedDate: action.modifiedDate,
                },
            ];
            saveItems(newNotes);
            return newNotes;
        }
        case ACTION.EDIT: {
            const newNotes = notes.map((note) =>
                note.id === action.note.id ? action.note : note
            );
            saveItems(newNotes);
            return newNotes;
        }
        case ACTION.DELETE: {
            const newNotes = notes.filter((note) => note.id !== action.id);
            saveItems(newNotes);
            return newNotes;
        }
        default: {
            throw Error("Unknown action: ", action.type);
        }
    }
}

function useInitialNotes() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}

export default function NotesProvider({ children }) {
    const [notes, dispatch] = useReducer(notesReducer, useInitialNotes());

    return (
        <notesContext.Provider value={notes}>
            <notesDispatchContext.Provider value={dispatch}>
                {children}
            </notesDispatchContext.Provider>
        </notesContext.Provider>
    );
}
