import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="card">
      <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      <h1>Hello, {user.name} 👋</h1>
      <p className="sub">You are successfully logged in</p>
      <div className="info">
        <p><span>Email</span>{user.email}</p>
        <p><span>Member since</span>{new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
