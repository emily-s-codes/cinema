import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Homepage from './pages/Homepage';
import Admin from "./pages/Admin"
import Reserve from "./pages/Reserve"
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import UnderConstruction from './pages/underConstruction';

function App() {
  const [reservations, setReservations] = useState([])
  const [cleared, setCleared] = useState(false)
  const [available, setAvailable] = useState(true)
  const [income, setIncome] = useState(0)
  const [checkoutClicked, setCheckoutClicked] = useState(false)

  let viewSelected = reservations.filter(res => {
    if (res.reserved === true) {
      return res
    }
  })

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKENDURL}/reservations`)
      .then(res => res.json())
      .then(data => {
        setReservations(data)
      })
      .catch(err => console.log('catch in fetch in app.js', err))
  }, [])

  const clearReservations = () => {
    console.log('reservations cleared')
    fetch(`${process.env.REACT_APP_BACKENDURL}/empty`)
      .then(res => res.json())
      .then(data => {
        setReservations(data)
        setCleared(true)
      })
    setReservations(reservations)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/"} element={<><Header page={"Home"} /><Homepage /></>} />
          <Route path={"/tbd"} element={<><Header page={"OOPS!"} /><UnderConstruction /></>} />
          <Route
            path={"/admin"}
            element={<>
              <Header page={"Admin"} />
              <Admin
                checkoutClicked={checkoutClicked}
                available={available}
                setAvailable={setAvailable}
                income={income}
                setIncome={setIncome}
                reservations={reservations}
                cleared={cleared}
                setCleared={setCleared}
                clearReservations={clearReservations}
                viewSelected={viewSelected} /></>} />
          <Route
            path={"/reserve"}
            element={<>
              <Header page={"Reservations"} />
              <Reserve
                checkoutClicked={checkoutClicked}
                setCheckoutClicked={setCheckoutClicked}
                reservations={reservations}
                setReservations={setReservations}
                viewSelected={viewSelected}
                available={available}
                setAvailable={setAvailable} /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
