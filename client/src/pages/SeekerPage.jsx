// client/src/pages/SeekerPage.jsx
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"; // ✅ default import

export default function SeekerPage() {
  const [foods, setFoods] = useState([]);
  const [username, setUsername] = useState("");

  const token = localStorage.getItem("token");

  // Decode JWT to get username
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token); // ✅ use default
        setUsername(decoded.username);
      } catch (err) {
        console.error("❌ JWT decode error:", err);
      }
    }
  }, [token]);

  // Fetch all food
  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/food");
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error("❌ Error fetching foods:", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome {username || "Seeker"}</h1>

      <h2 className="text-xl font-bold mb-2">Available Food</h2>
      {foods.length === 0 ? (
        <p>No food available currently.</p>
      ) : (
        <ul className="list-disc pl-5">
          {foods.map((f) => (
            <li key={f._id}>
              <strong>{f.item}</strong> ({f.quantity}) – {f.location} by {f.donor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
