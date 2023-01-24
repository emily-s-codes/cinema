import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ViewReservations from "../components/viewReservations/ViewRes";
import "./Admin.css"

const Admin = ({ clearReservations, cleared, setCleared, reservations, available, setAvailable, income, setIncome }) => {
    const [view, setView] = useState(false)

    const toggleViewCleared = () => {
        setView(!view)
        setCleared(false)
    }

    const trueRes = reservations?.filter((res) => res.reserved === true)

    const showIncome = () => {
        let trueResPrices = trueRes?.map((selection) => { return selection.priceClass })
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
        if (trueRes) {
            setAvailable(24 - trueRes.length)
        }
        showIncome()
    }, [])

    return (
        <div className="pageContainer">
            <Header page={"Admin"} />
            <main>
                <section className="adminInfoSection">
                    <span>Warning! The features 'Available seats' and 'Total income' are under development and currently unreliable</span>
                    <p className="adminInfoP">Available seats: {available}</p>
                    <p className="adminInfoP">Total Income: {income} €</p>
                </section>
                <section className="adminSection">
                    <section>
                        <p className="onClickP" onClick={toggleViewCleared}>view all reservations {view ? "—" : "+"}</p>
                        <div className="resGrid" >
                            {view && trueRes.map((reservation, key) => {
                                return (<>
                                    {reservations && <ViewReservations key={key} reservation={reservation} />}
                                </>)
                            })}
                        </div>
                    </section>
                    <section>
                        <p className="onClickP" onClick={clearReservations}>delete all reservations</p>
                        {cleared && <p>Success!</p>}
                    </section>
                </section>
            </main >
        </div>
    );
}

export default Admin;