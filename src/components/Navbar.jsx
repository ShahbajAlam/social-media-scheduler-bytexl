import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => (
    <nav>
        <h2>React Blog</h2>
        <div>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
        </div>
    </nav>
);

export default Navbar;
