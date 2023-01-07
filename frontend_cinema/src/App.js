import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Homepage from './pages/Homepage';
import Admin from "./pages/Admin"
import Reserve from "./pages/Reserve"
import { useEffect, useState } from 'react';
import Header from './components/header/Header';

function App() {
  const [reservations, setReservations] = useState([])
  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    fetch('http://localhost:9000/empty')
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


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/"} element={<><Header page={"Home"} /><Homepage /></>} />
          <Route path={"/admin"} element={<><Header page={"Admin"} /><Admin cleared={cleared} setCleared={setCleared} clearReservations={clearReservations} /></>} />
          <Route path={"/reserve"} element={<><Header page={"Reservations"} /><Reserve reservations={reservations} /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
