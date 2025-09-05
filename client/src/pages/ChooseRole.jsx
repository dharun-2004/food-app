import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>What would you like to do?</h2>
      <button onClick={() => navigate("/main?role=donor")}>Give Food</button>
      <button onClick={() => navigate("/main?role=seeker")}>Take Food</button>
    </div>
  );
}
