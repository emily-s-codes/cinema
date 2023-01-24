import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Seat from "../components/seat/Seat";
import "./Reserve.css"

const Reserve = ({ setCheckoutClicked, reservations, setReservations, available, viewSelected, setAvailable }) => {
    const [selection, setSelection] = useState([])
    const [_, setOwnerEmail] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [confirmClicked, setConfirmClicked] = useState(false)
    const [showPrice, setShowPrice] = useState(0)
    const [newSession, setNewSession] = useState(false)

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

    const cancel = () => {
        setConfirmClicked(false)
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
        setNewSession(true)
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

    return (
        <div className="pageContainer">
            <Header page={"Reservations"} />
            <main className="resMain">
                <p className={newSession ?
                    "hidden" :
                    success ? "" : "hidden"}>Loading ... </p>
                <section className={confirmClicked ? "hidden" : "selectSection"}>
                    <section className="seatGrid">
                        {reservations.map((reservation, key) => {
                            return <Seat key={key} index={key} confirmed={confirmed} setSelection={setSelection} reservation={reservation} reservations={reservations} setReservations={setReservations} available={available}
                                setAvailable={setAvailable}
                                success={success}
                                setSuccess={setSuccess} />
                        })}
                    </section>
                    <section className="screen"><p className="small">screen</p></section>
                </section>
                <section className={success ? "hidden" : "completeResSection"}>
                    <section className="colorKey">
                        <p className={confirmClicked ? "hidden" : "bInfo"}>10€</p>
                        <p className={confirmClicked ? "hidden" : "aInfo"}>8€</p>
                        <p className={confirmClicked ? "hidden" : "selectedInfo"}>Selected</p>
                        <p className={confirmClicked ? "hidden" : "unavailableInfo"}>Unavailable</p>
                    </section>
                    <div className="reservationButtonDiv">
                        <button onClick={confirmed} className={confirmClicked ? "hidden" : ""}>Confirm Selection</button>
                        <button onClick={cancel} className={confirmClicked ? "" : "hidden"}>Cancel</button>
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
                    </div>}
                </section>
                {newSession &&
                    <div className="reservationButtonDiv">
                        <button onClick={() => { window.location.reload(true) }}>New Session</button>
                    </div>
                }
            </main >
        </div>);
}

export default Reserve;