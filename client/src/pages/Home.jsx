import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🍽️ Welcome to FoodShare</h1>
      <p>Connecting donors with people who need food</p>
      <Link to="/register">
        <button style={{ margin: "10px" }}>Register</button>
      </Link>
      <Link to="/login">
        <button style={{ margin: "10px" }}>Login</button>
      </Link>
    </div>
  );
}
