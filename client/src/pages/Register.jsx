import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Account created successfully!");
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Create Account</h2>
        <p className="subtitle">Join DevPilot</p>

        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleRegister}>
          Sign Up
        </button>

        <p className="link-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
