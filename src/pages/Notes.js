import NoteList from "../components/note/NoteList";
import NotesProvider from "../context/NoteContext";
import LabelsProvider from "../context/LabelContext";

export default function Notes() {
    return (
        <NotesProvider>
            <LabelsProvider>
                <NoteList />
            </LabelsProvider>
        </NotesProvider>
    );
}
