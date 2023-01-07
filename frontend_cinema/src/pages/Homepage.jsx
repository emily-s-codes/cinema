import "./Homepage.css"
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <main className="homepageMain">
            <h2>Welcome to KornerKino!</h2>
            <section className="homeSection">
                <Link to={"/reserve"}>Reserve Seats</Link>
                <Link to={"/tbd"}>View Existing Reservation</Link>
            </section>
        </main>
    );
}

export default Homepage;