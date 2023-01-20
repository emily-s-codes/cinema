import "./Seat.css"
import { useState } from "react";

const Seat = ({ index, reservation, setSelection, reservations, setReservations, confirmed, setUnavailable, success }) => {
    const [selected, setSelected] = useState(false)

    const changeHandler = (reserved) => {
        if (selected === false) {
            setSelected(true)
            setSelection(prev => [...prev, reserved])
        }

        if (selected === true) {
            setSelected(false)
            setSelection(prev => prev.filter(seats => seats !== reserved))
        }
    }

    const noChangeHandler = () => {
        console.log('sorry, this seat is reserved')
    }


    return (
        <label id={reservation.seat}
            className={
                reservation.reserved ?
                    'seatDiv unavailable' :
                    selected ? "selected seatDiv" : `${reservation.priceClass} seatDiv`}
        >
            <input
                type="checkbox"
                defaultChecked={reservation.reserved}
                onChange={reservation.reserved ? () => noChangeHandler() : () => changeHandler(reservation.seat)}
            >
            </input>
        </label >

    );
}

export default Seat;