import "./Seat.css"
import { useState } from "react";

const Seat = ({ key, reservation }) => {
    const [reserved, setReserved] = useState(false)



    const reserveSeat = () => {
        setReserved(!reserved)
    }

    return (
        <div
            key={key}
            onClick={reserveSeat}
            className={reserved ?
                'seatDiv c' :
                `seatDiv ${reservation.priceClass}`}>
            {reservation.seat}
        </div>
    );
}

export default Seat;