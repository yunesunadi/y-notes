import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import CreateNote from "./pages/CreateNote";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Notes />} />
                <Route path="notes" element={<Notes />} />
                <Route path="create" element={<CreateNote />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
