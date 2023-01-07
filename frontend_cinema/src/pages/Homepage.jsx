import "./Homepage.css"
import { useState } from "react";
import Seat from "../components/seat/Seat";

const Homepage = ({ reservations }) => {


    return (
        <main>
            <h1>homepage</h1>
            <section className="seatGrid">
                {reservations.map((reservation, key) => {
                    return <Seat key={key} reservation={reservation} />
                })}
            </section>

        </main>
    );
}

export default Homepage;