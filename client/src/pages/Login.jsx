// client/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);

      // Redirect based on role
      if (user.role === "donor") navigate("/donor");
      else if (user.role === "seeker") navigate("/seeker");
    } catch (err) {
      setMessage("❌ Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} /><br />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} /><br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
