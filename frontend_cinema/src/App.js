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
  const [showPrice, setShowPrice] = useState(0)

  let viewSelected = reservations.filter(res => {
    if (res.reserved === true) {
      return res
    }
  })

  useEffect(() => {
    fetch('http://localhost:9000/reservations')
      .then(res => res.json())
      .then(data => {
        setReservations(data)
      })
      .catch(err => console.log('catch in fetch in app.js', err))
  }, [])

  const clearReservations = () => {
    console.log('reservations cleared')
    fetch('http://localhost:9000/empty')
      .then(res => res.json())
      .then(data => {
        setReservations(data)
        setCleared(true)
      })
    setReservations(reservations)
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
                calcPrice={calcPrice}
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
                reservations={reservations}
                setReservations={setReservations}
                calcPrice={calcPrice}
                viewSelected={viewSelected}
                available={available}
                setAvailable={setAvailable} /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
