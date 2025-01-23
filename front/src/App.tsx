import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from './components/home'
import Activities from "./components/activities";
import "leaflet/dist/leaflet.css";
import './App.css'


function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={ <Mainpage />} />
        <Route path="/activities" element={ <Activities />}/>
    </Routes>
</Router>
  )
}

export default App
