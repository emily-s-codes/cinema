import { useEffect, useState } from "react";
import Seat from "../components/seat/Seat";
import "./Reserve.css"

const Reserve = ({ checkoutClicked, setCheckoutClicked, reservations, setReservations, available, viewSelected, setAvailable }) => {
    const [selection, setSelection] = useState([])
    const [ownerEmail, setOwnerEmail] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [confirmClicked, setConfirmClicked] = useState(false)
    const [showPrice, setShowPrice] = useState(0)

    useEffect(() => {
        calcPrice()
    }, [selection])

    const calcPrice = () => {
        let price = 0

        selection.forEach((spot) => {
            const index = reservations.findIndex((reservation) => reservation.seat === spot)

            if (reservations[index].priceClass === "b") {
                price += 10
            }

            if (reservations[index].priceClass === "a") {
                price += 8
            }
        })
        setShowPrice(price)
        return price
    }

    const confirmed = () => {
        setConfirmClicked(true)
        calcPrice()
    }

    const submitHandler = (price) => {
        let seatsReserved = viewSelected.map((selectedSeat) => selectedSeat.seat)
        let seatsString = seatsReserved.join(", ")
        setSuccess(true)
        setCheckoutClicked(true)
        sendOwnerEmail(price, seatsString)
    }

    const updateAvailability = () => {
        fetch(`${process.env.REACT_APP_BACKENDURL}/reserve`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selection)
        })
            .then((res) => res.json())
            .then((data) => {
                setReservations(data)
            })
    }

    const sendCustEmail = (price, seatsString) => {
        console.log('FE: customer')
        fetch(`${process.env.REACT_APP_BACKENDURL}/api/customermail`, {
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
                updateAvailability()
            })
            .catch(err => console.log(err))
        console.log(customerEmail)
    }

    const sendOwnerEmail = (price, seatsString) => {
        console.log('FE: owner')
        fetch(`${process.env.REACT_APP_BACKENDURL}/api/ownermail`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price,
                seatsString
            })
        })
            .then((res) => {
                console.log(res)
                res.json()
            })
            .then((data) => {
                setOwnerEmail(data)
                sendCustEmail(price, seatsString)
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
                {confirmClicked && <p>Total: {showPrice} €</p>}
            </div>
            {confirmClicked && <div className="reservationButtonDiv">
                <button onClick={() => { submitHandler(showPrice) }}>Checkout</button>
                {success && <p>Success!</p>}
            </div>}
            {checkoutClicked &&
                <div className="reservationButtonDiv">
                    <button onClick={() => { window.location.reload(true) }}>New Session</button>
                </div>
            }
        </section>
    </main >);
}

export default Reserve;