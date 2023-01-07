import { useState } from "react";
import ViewReservations from "../components/viewReservations/ViewRes";
import "./Admin.css"

const Admin = ({ clearReservations, cleared, setCleared, reservations }) => {
    const [view, setView] = useState(false)

    const toggleViewCleared = () => {
        setView(!view)
        setCleared(false)
    }

    const trueRes = reservations.filter((res) => res.reserved === true)


    return (
        <main>
            <h1>admin</h1>
            <section className="adminSection">
                <section>
                    <p className="onClickP" onClick={toggleViewCleared}>view all reservations</p>
                    {view && trueRes.map((reservation, key) => {
                        return (<div key={key}>
                            <ViewReservations reservation={reservation} />
                        </div>)
                    })}
                    {!view && <p>No reservations</p>}
                </section>
                <section>
                    <p className="onClickP" onClick={clearReservations}>delete all reservations</p>
                    {cleared && <p>Success!</p>}
                </section>
            </section>

        </main>
    );
}

export default Admin;