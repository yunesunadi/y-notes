import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1>Page Not Found</h1>
            <Link to="/">Go to Home</Link>
        </>
    );
}
