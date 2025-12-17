import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddApi() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/endpoints", { name, url });
      alert("API added successfully!");
      navigate("/dashboard");
    } catch {
      alert("Failed to add API");
    }
  };

  return (
    <div className="container">
      <h2>Add New API</h2>

      <input
        className="input"
        placeholder="API Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        placeholder="API URL"
        onChange={(e) => setUrl(e.target.value)}
      />

      <button className="btn" onClick={handleSubmit}>
        Add API
      </button>
    </div>
  );
}
