import "./Seat.css"
import { useState } from "react";

const Seat = ({ index, reservation, reservations, setReservations, confirmed }) => {
    const [selected, setSelected] = useState(reservation.reserved)

    const changeHandler = (seat, reserved) => {
        setSelected(!selected)
        console.log(reservation.seat, !selected, !reserved)
        editHandler(seat, reserved)
    }

    const editHandler = (seat, reserved) => {
        fetch(`http://localhost:9000/reserve/${seat}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                seat,
                reserved: !reserved
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setReservations(data)
            })
    }

    return (
        <label className={selected ?
            'seatDiv selected' :
            `seatDiv ${reservation.priceClass}`}>
            <input
                type="checkbox"
                checked={reservation.reserved}
                onChange={() => changeHandler(reservation.seat, reservation.reserved)}
            >
            </input>
        </label>

    );
}

export default Seat;