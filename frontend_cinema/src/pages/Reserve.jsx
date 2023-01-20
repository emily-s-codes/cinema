import { useState } from "react";
import Seat from "../components/seat/Seat";
import "./Reserve.css"

const Reserve = ({ reservations, setReservations, calcPrice, available, income, showPrice, viewSelected, setAvailable }) => {
    const [selection, setSelection] = useState([])
    const [ownerEmail, setOwnerEmail] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [confirmClicked, setConfirmClicked] = useState(false)
    console.log(selection)

    let selectedArray = []

    const confirmed = () => {
        setConfirmClicked(true)
        calcPrice()
        showSelectedArray()
    }
    function showSelectedArray() {
        selectedArray.map((selection) => console.log(selection.id))
        let seatsSelection = selectedArray.map((selection) => selection.id)
        let seatsString = seatsSelection.join(", ")
    }

    const submitHandler = (price) => {
        let seatsReserved = viewSelected.map((selectedSeat) => selectedSeat.seat)
        let reservedString = seatsReserved.join(", ")
        setSuccess(true)
        updateAvailability()
        sendOwnerEmail(price, reservedString)
        sendCustEmail(price, reservedString)
    }

    const sendOwnerEmail = (price, seatsString) => {
        fetch('http://localhost:9000/api/ownermail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price,
                seatsString
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setOwnerEmail(data)
            })
        console.log(ownerEmail)
    }
    const sendCustEmail = (price, seatsString) => {
        fetch('http://localhost:9000/api/customermail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price,
                seatsString
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setCustomerEmail(data)
            })
        console.log(customerEmail)
    }

    const updateAvailability = () => {
        fetch(`http://localhost:9000/reserve`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selection)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setReservations(data)
            })
    }

    return (<main className="resMain">
        <section className="selectSection">
            <section className="seatGrid">
                {reservations.map((reservation, key) => {
                    return <Seat key={key} index={key} confirmed={confirmed} setSelection={setSelection} reservation={reservation} reservations={reservations} setReservations={setReservations} available={available}
                        setAvailable={setAvailable}
                        success={success}
                        setSuccess={setSuccess} />
                })}
            </section>
            <section className="screen">Screen</section>
        </section>
        <section className="completeResSection">
            <p className="bInfo">Rows 3 & 4: 10€</p>
            <p className="aInfo">Rows 1 & 2: 8€</p>
            <p className="selectedInfo">Your selection</p>
            <p className="unavailableInfo">Unavailable</p>
            <div className="reservationButtonDiv">
                <button onClick={confirmed}>Confirm Selection</button>
                {confirmClicked && <div className="selectedDiv">
                    {selection?.map((confirmation, key) => {
                        return (
                            <p key={key}>{confirmation}</p>
                        )
                    })}
                </div>}
                {showPrice > 0 && <p>Total: {showPrice} €</p>}
            </div>
            {confirmClicked && <div className="reservationButtonDiv">
                <button onClick={() => { submitHandler(showPrice) }}>Checkout</button>
                {success && <p>Success!</p>}
            </div>}
        </section>
    </main >);
}

export default Reserve;