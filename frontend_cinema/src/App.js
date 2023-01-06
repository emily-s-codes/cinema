import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Homepage from './pages/Homepage';
import Admin from "./pages/Admin"
import Reserve from "./pages/Reserve"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/admin"} element={<Admin />} />
          <Route path={"/reserve"} element={<Reserve />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
