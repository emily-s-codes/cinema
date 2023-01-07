import "./Seat.css"
import { useState } from "react";

const Seat = ({ index, reservation, reservations, setReservations, confirmed }) => {
    const [updatedSeats, setUpdatedSeats] = useState(false)
    const [selected, setSelected] = useState(false)

    const reserveSeat = (seat, reserved) => {
        setSelected(!selected)
        reservation.reserved = !reserved
        fetch(`http://localhost:9000/reserve/${seat}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reserved
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUpdatedSeats(data)
            })
    }

    return (
        <label className={selected ?
            'seatDiv selected' :
            `seatDiv ${reservation.priceClass}`}>
            <input
                type="checkbox"
                checked={reservation.reserved}
                onChange={() => reserveSeat(reservation.seat, !reservation.reserved)}
            // onClick={confirmed}
            >
            </input>
        </label>

    );
}

export default Seat;