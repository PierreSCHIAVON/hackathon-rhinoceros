import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./components/home";
import Activities from "./components/activities";
import Chat from "./components/chat";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
