import AddNote from "../components/note/AddNote";
import NotesProvider from "../context/NoteContext";
import LabelsProvider from "../context/LabelContext";

export default function CreateNote() {
    return (
        <NotesProvider>
            <LabelsProvider>
                <AddNote />
            </LabelsProvider>
        </NotesProvider>
    );
}
