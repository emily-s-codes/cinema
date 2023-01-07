import "./Admin.css"

const Admin = ({ clearReservations, cleared }) => {

    return (
        <main>
            <h1>admin</h1>
            <p className="onClickP" onClick={clearReservations}>delete all reservations</p>
            {cleared && <p>Success!</p>}
        </main>
    );
}

export default Admin;