import "./Header.css"
import { NavLink } from "react-router-dom";

const Header = ({ page }) => {
    return (<>

        <nav className="headerNav">
            <h2>KornerKino</h2>
            <h1>{page}</h1>
            <div className="navLinks">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/reserve"}>Reserve</NavLink>
            </div>
        </nav>
    </>);
}

export default Header;