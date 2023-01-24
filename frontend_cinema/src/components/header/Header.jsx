import "./Header.css"
import { Link, NavLink } from "react-router-dom";

const Header = ({ page }) => {
    return (<>

        <nav className="headerNav">
            <Link to={"/"} ><h2>KornerKino</h2></Link>
            <h1 className="hideMobile">{page}</h1>
            <div className="navLinks">
                <NavLink to={"/"} >Home</NavLink>
                <NavLink to={"/reserve"} >Reserve</NavLink>
            </div>
        </nav>
    </>);
}

export default Header;