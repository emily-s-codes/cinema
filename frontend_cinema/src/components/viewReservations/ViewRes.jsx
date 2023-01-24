import "./ViewRes.css"

const ViewReservations = ({ reservation }) => {
    return (
        <p>{reservation.seat}</p>
    );
}

export default ViewReservations