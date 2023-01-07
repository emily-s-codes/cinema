import "./Seat.css"
import { useState } from "react";

const Seat = ({ key, reservation }) => {
    const [reserved, setReserved] = useState(false)
    return (
        <div
            key={key}
            onClick={() => { setReserved(!reserved) }}
            className={reserved ?
                'seatDiv c' :
                `seatDiv ${reservation.priceClass}`}>
            {reservation.seat}
        </div>
    );
}

export default Seat;