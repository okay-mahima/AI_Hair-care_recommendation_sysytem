import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./pages.css";

function Login({ setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {

    if (!username.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "https://ai-hair-care-recommendation-sysytem.onrender.com/login",
        {
          username,
          password,
        }
      );

      setUser(response.data.username);

      alert(response.data.message);

      navigate("/recommend");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Cannot connect to backend");
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1 className="login-title">
          🌸 Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to continue your AI Hair Care Journey
        </p>

        <div className="login-form">

          <label>Username</label>

          <input
            className="login-input"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>

          <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-btn"
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </div>

        <p className="signup-text">
          Don't have an account?
          <Link to="/signup" className="signup-link">
            {" "}Sign Up
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Login;