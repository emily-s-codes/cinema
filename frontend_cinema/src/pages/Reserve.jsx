import { useState } from "react";
import Seat from "../components/seat/Seat";
import "./Reserve.css"

const Reserve = ({ reservations, setReservations }) => {
    const [selection, setSelection] = useState([])
    const [email, setEmail] = useState("")
    let viewSelected = reservations.filter(res => {
        if (res.reserved === true) {
            return res
        }
    })

    const confirmed = () => {
        setSelection(viewSelected)
    }


    return (<main className="resMain">
        <section className="selectSection">
            <section className="seatGrid">
                {reservations.map((reservation, key) => {
                    return <Seat key={key} index={key} confirmed={confirmed} reservation={reservation} reservations={reservations} setReservations={setReservations} />
                })}
            </section>
            <section className="screen">Screen</section>
        </section>
        <section className="completeResSection">
            <p className="a">Rows 1 & 2: 10€</p>
            <p className="b">Rows 3 & 4: 8€</p>
            <p className="selected">Your selection</p>
            <p className="unavailable">Unavailable</p>
            <div className="reservationButtonDiv">
                <button onClick={confirmed}>Confirm Selection</button>
                <div className="selectedDiv">
                    {selection.map((confirmation, key) => {
                        return (
                            <p key={key}>{confirmation.seat}</p>
                        )
                    })}
                </div>
            </div>
            <div className="reservationButtonDiv">
                <button onClick={confirmed}>Checkout</button>
            </div>
        </section>
    </main >);
}

export default Reserve;