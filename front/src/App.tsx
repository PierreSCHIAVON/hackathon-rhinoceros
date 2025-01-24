import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from './components/home';
import Activities from "./components/activities";
import Chat from './components/chat';
import "leaflet/dist/leaflet.css";
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
