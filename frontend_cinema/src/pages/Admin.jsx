import { useEffect, useState } from "react";
import ViewReservations from "../components/viewReservations/ViewRes";
import "./Admin.css"

const Admin = ({ clearReservations, cleared, setCleared, reservations, available, setAvailable, income, setIncome, viewSelected }) => {
    const [view, setView] = useState(false)

    const toggleViewCleared = () => {
        setView(!view)
        setCleared(false)
    }

    const trueRes = reservations.filter((res) => res.reserved === true)
    const trueResLength = trueRes.length
    console.log(trueRes)

    const showIncome = () => {
        let trueResPrices = trueRes.map((selection) => { return selection.priceClass })
        trueResPrices.forEach((seat) => {
            if (seat === "b") {
                income += 10
            }
            if (seat === "a") {
                income += 8
            }
        })
        setIncome(income)
        return income
    }

    useEffect(() => {
        setAvailable(24 - trueResLength)
        showIncome()
    }, [trueResLength])

    console.log(income)

    return (
        <main>
            <section className="adminInfoSection">
                <p className="adminInfoP">Available seats: {available}</p>
                <p className="adminInfoP">Cumulative income: {income} €</p>
            </section>
            <section className="adminSection">
                <section>
                    <p className="onClickP" onClick={toggleViewCleared}>view all reservations {view ? "—" : "+"}</p>
                    {view && trueRes.map((reservation, key) => {
                        return (<div key={key}>
                            <ViewReservations reservation={reservation} />
                        </div>)
                    })}
                </section>
                <section>
                    <p className="onClickP" onClick={clearReservations}>delete all reservations</p>
                    {cleared && <p>Success!</p>}
                </section>
            </section>

        </main >
    );
}

export default Admin;