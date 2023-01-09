import { useState } from "react";
import Seat from "../components/seat/Seat";
import "./Reserve.css"

const Reserve = ({ reservations, setReservations }) => {
    const [selection, setSelection] = useState([])
    const [ownerEmail, setOwnerEmail] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [showPrice, setShowPrice] = useState(0)
    const [confirmClicked, setConfirmClicked] = useState(false)

    let viewSelected = reservations.filter(res => {
        if (res.reserved === true) {
            return res
        }
    })

    const confirmed = () => {
        setSelection(viewSelected)
        setConfirmClicked(true)
        calcPrice()
    }

    const calcPrice = () => {
        let seats = viewSelected.map((selection) => { return selection.priceClass })
        let price = 0
        seats.forEach((seat) => {
            if (seat === "b") {
                price += 10
            }
            if (seat === "a") {
                price += 8
            }
        })
        setShowPrice(price)
        return price
    }

    const formatEmails = (price) => {
        let seatsSelection = viewSelected.map((selectedSeat) => selectedSeat.seat)
        let seatsString = seatsSelection.join(", ")
        setSuccess(true)

        sendOwnerEmail(price, seatsString)
        sendCustEmail(price, seatsString)
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
            <p className="bInfo">Rows 3 & 4: 10€</p>
            <p className="aInfo">Rows 1 & 2: 8€</p>
            <p className="selectedInfo">Your selection</p>
            <p className="unavailableInfo">Unavailable</p>
            <div className="reservationButtonDiv">
                <button onClick={confirmed}>Confirm Selection</button>
                <div className="selectedDiv">
                    {selection.map((confirmation, key) => {
                        return (
                            <p key={key}>{confirmation.seat}</p>
                        )
                    })}
                </div>
                {showPrice && <p>Total: {showPrice} €</p>}
            </div>
            {confirmClicked && <div className="reservationButtonDiv">
                <button onClick={() => { formatEmails(showPrice) }}>Checkout</button>
                {success && <p>Success!</p>}
            </div>}
        </section>
    </main >);
}

export default Reserve;