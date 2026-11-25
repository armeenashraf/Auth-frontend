import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

// Only logged-in users can open this page
function Private({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loader">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

// Logged-in users are sent to the dashboard instead of login/signup
function Public({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loader">Loading...</div>;
  return user ? <Navigate to="/dashboard" /> : children;
}

export default function App() {
  return (
    <div className="bg">
      <span className="blob b1"></span>
      <span className="blob b2"></span>
      <span className="blob b3"></span>
      <Routes>
        <Route path="/login" element={<Public><Login /></Public>} />
        <Route path="/signup" element={<Public><Signup /></Public>} />
        <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
