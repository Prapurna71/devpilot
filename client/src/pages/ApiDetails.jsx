import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ApiDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch logs immediately
    const fetchLogs = () => {
      api.get(`/endpoints/${id}/logs`).then((res) => setData(res.data));
    };

    fetchLogs();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLogs, 30000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [id]);

  if (!data) return <p className="center">Loading...</p>;

  // Prepare chart data (last 10 logs)
  const chartLogs = data.logs.slice(0, 10).reverse();
  const chartData = {
    labels: chartLogs.map((log, index) => `Check ${index + 1}`),
    datasets: [
      {
        label: "Response Time (ms)",
        data: chartLogs.map((log) => log.responseTime),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Response Time Trend"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time (ms)"
        }
      }
    }
  };

  return (
    <div className="container">
      <h2>{data.api.name}</h2>

      <div className="stats">
        <span>Uptime: {data.summary.uptimePercentage}</span>
        <span>Avg Response: {data.summary.avgResponseTime} ms</span>
      </div>

      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>

      <h3>Logs</h3>

      {data.logs.map((log) => (
        <div key={log.id} className={`log ${log.isUp ? "up" : "down"}`}>
          {log.isUp ? "🟢 UP" : "🔴 DOWN"} — {log.responseTime} ms
        </div>
      ))}
    </div>
  );
}
