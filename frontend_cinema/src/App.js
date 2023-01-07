import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Homepage from './pages/Homepage';
import Admin from "./pages/Admin"
import Reserve from "./pages/Reserve"
import { useEffect, useState } from 'react';

function App() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    fetch('http://localhost:9000/empty')
      .then(res => res.json())
      .then(data => {
        setReservations(data)
      })
      .catch(err => console.log('catch in fetch in app.js', err))
  }, [])



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/"} element={<Homepage reservations={reservations} />} />
          <Route path={"/admin"} element={<Admin />} />
          <Route path={"/reserve"} element={<Reserve />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
