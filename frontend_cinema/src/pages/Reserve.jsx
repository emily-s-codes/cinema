import Seat from "../components/seat/Seat";
import "./Reserve.css"

const Reserve = ({ reservations }) => {
    return (<main>
        <section className="seatGrid">
            {reservations.map((reservation, key) => {
                return <Seat key={key} reservation={reservation} />
            })}
        </section>
        <section className="screen">Screen</section>
    </main>);
}

export default Reserve;