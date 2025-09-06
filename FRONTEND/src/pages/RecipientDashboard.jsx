import { useState, useEffect } from "react";
import API from "../api/api";

function RecipientDashboard() {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const claimFood = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(`/foods/${id}/claim`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFoods();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to claim food");
    }
  };

  return (
    <div>
      <h2>🥗 Recipient Dashboard</h2>
      <ul>
        {foods.map((f) => (
          <li key={f._id}>
            {f.title} - {f.quantity} available
            <button onClick={() => claimFood(f._id)}>Claim</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipientDashboard;
