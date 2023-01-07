import "./ViewRes.css"

const ViewReservations = ({ reservation }) => {
    return (<div className="viewResDiv">
        <p>{reservation.seat}</p>
    </div>);
}

export default ViewReservations