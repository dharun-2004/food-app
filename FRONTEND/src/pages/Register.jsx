import { useState } from "react";
import API from "../api/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "recipient" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      alert("Registered successfully! Token: " + res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="recipient">Recipient</option>
        <option value="donor">Donor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
