import { useState, useEffect } from "react";
import API from "../api/api";

function DonorDashboard() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    quantity: 1,
    pickupReadyAt: "",
    pickupUntil: "",
  });

  // Fetch donor's own listings
  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/foods/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/foods", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: "", description: "", quantity: 1, pickupReadyAt: "", pickupUntil: "" });
      fetchFoods();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post food");
    }
  };

  return (
    <div>
      <h2>🍱 Donor Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <input type="datetime-local" value={form.pickupReadyAt} onChange={(e) => setForm({ ...form, pickupReadyAt: e.target.value })} />
        <input type="datetime-local" value={form.pickupUntil} onChange={(e) => setForm({ ...form, pickupUntil: e.target.value })} />
        <button type="submit">Add Food</button>
      </form>

      <h3>My Listings</h3>
      <ul>
        {foods.map((f) => (
          <li key={f._id}>
            {f.title} - {f.quantity} (Pickup until {new Date(f.pickupUntil).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DonorDashboard;
