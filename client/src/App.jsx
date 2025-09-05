import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ChooseRole from "./pages/ChooseRole.jsx";
import DonorPage from "./pages/DonorPage.jsx";
import SeekerPage from "./pages/SeekerPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/choose" element={<ChooseRole />} />
      <Route path="/donor" element={<DonorPage />} />
      <Route path="/seeker" element={<SeekerPage />} />
    </Routes>
  );
}

export default App;
