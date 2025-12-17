import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [apis, setApis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/endpoints").then((res) => setApis(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    
    if (!window.confirm("Are you sure you want to delete this API?")) {
      return;
    }

    try {
      await api.delete(`/endpoints/${id}`);
      setApis(apis.filter((a) => a.id !== id));
    } catch {
      alert("Failed to delete API");
    }
  };

  const getStatus = (latestLog) => {
    if (!latestLog) {
      return { text: "UNKNOWN", className: "status-unknown" };
    }

    if (!latestLog.isUp) {
      return { text: "DOWN", className: "status-down" };
    }

    if (latestLog.responseTime > 2000) {
      return { text: "SLOW", className: "status-slow" };
    }

    return { text: "UP", className: "status-up" };
  };

  return (
    <div className="container">
      <div className="header">
        <h2>My APIs</h2>
        <div className="header-buttons">
          <button className="btn-secondary" onClick={() => navigate("/add-api")}>
            + Add API
          </button>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {apis.map((a) => {
        const status = getStatus(a.latestLog);
        return (
          <div
            key={a.id}
            className="api-card"
            onClick={() => navigate(`/api/${a.id}`)}
          >
            <div className="api-card-content">
              <div>
                <h4>
                  {a.name}
                  <span className={`status-badge ${status.className}`}>
                    {status.text}
                  </span>
                </h4>
                <p>{a.url}</p>
              </div>
              <button
                className="btn-delete"
                onClick={(e) => handleDelete(a.id, e)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
