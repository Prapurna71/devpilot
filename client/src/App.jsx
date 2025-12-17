import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApiDetails from "./pages/ApiDetails";
import AddApi from "./pages/AddApi";

const isLoggedIn = () => !!localStorage.getItem("token");

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/add-api"
          element={isLoggedIn() ? <AddApi /> : <Navigate to="/" />}
        />
        <Route
          path="/api/:id"
          element={isLoggedIn() ? <ApiDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
