import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Labels from "./label/Labels";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function handleClick() {
        setTimeout(() => {
            navigate("/n");
            setTimeout(() => {
                navigate("/");
            }, 7);
        }, 5);
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" onClick={handleClick}>
                        Notes
                    </Link>
                </li>
                <li>
                    <Link to="/create">Create Note</Link>
                </li>
                <li>
                    <button
                        onClick={() => setIsOpen((prevState) => !prevState)}
                    >
                        Labels
                    </button>
                </li>
            </ul>
            {isOpen && <Labels />}
        </nav>
    );
}
