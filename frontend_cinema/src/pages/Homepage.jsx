import "./Homepage.css"
import { Link } from "react-router-dom";
import Header from "../components/header/Header";

const Homepage = () => {
    return (
        <div className="pageContainer">
            <Header page={"Home"} />
            <main className="homepageMain">
                <h2>Welcome to KornerKino!</h2>
                <section className="homeSection">
                    <Link to={"/reserve"}>Reserve Seats</Link>
                    <Link to={"/tbd"}>View Existing Reservation</Link>
                </section>
                <section className="homeSection">
                    <Link to={"/admin"}>Admin Log-In</Link>
                </section>
            </main>
        </div>
    );
}

export default Homepage;