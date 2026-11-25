import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="logo">✨</div>
      <h1>Create Account</h1>
      <p className="sub">Join us, it only takes a minute</p>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" placeholder="At least 6 characters" value={form.password} onChange={handleChange} required />
        <button disabled={loading}>{loading ? "Creating..." : "Sign Up"}</button>
      </form>
      <p className="switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
