// client/src/pages/DonorPage.jsx
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"; // ✅ default import

export default function DonorPage() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState("");
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

  // Upload food
  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");

    if (!item || !quantity || !location) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item, quantity, location }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Upload failed");

      setItem("");
      setQuantity("");
      setLocation("");
      fetchFoods();
    } catch (err) {
      console.error("❌ Upload error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome {username || "Donor"}</h1>

      <h2 className="text-xl font-semibold mb-2">Upload Food</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Food Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Upload Food
        </button>
      </form>

      {error && <p className="text-red-500">❌ {error}</p>}

      <h2 className="text-xl font-bold mb-2">Available Food</h2>
      <ul className="space-y-3">
        {foods.map((f) => (
          <li key={f._id} className="border p-3 rounded shadow-sm">
            <p><strong>Donor:</strong> {f.donor}</p>
            <p><strong>Item:</strong> {f.item}</p>
            <p><strong>Quantity:</strong> {f.quantity}</p>
            <p><strong>Location:</strong> {f.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
