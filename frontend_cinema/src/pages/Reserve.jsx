import { useState } from "react";
import Seat from "../components/seat/Seat";
import "./Reserve.css"

const Reserve = ({ reservations, setReservations }) => {
    const [selection, setSelection] = useState([])
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [showPrice, setShowPrice] = useState(0)

    let viewSelected = reservations.filter(res => {
        if (res.reserved === true) {
            return res
        }
    })

    const confirmed = () => {
        setSelection(viewSelected)
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

    const sendEmail = (price) => {
        let seatsSelection = viewSelected.map((selectedSeat) => selectedSeat.seat)
        let seatsString = seatsSelection.join(", ")
        console.log('sent email', price, seatsString)
        setSuccess(true)
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
                setEmail(data)
            })
        console.log(email)
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
                {showPrice && <p>Total: {showPrice} €</p>}
            </div>
            <div className="reservationButtonDiv">
                <button onClick={() => { sendEmail(showPrice) }}>Checkout</button>
                {success && <p>Success!</p>}
            </div>
        </section>
    </main >);
}

export default Reserve;