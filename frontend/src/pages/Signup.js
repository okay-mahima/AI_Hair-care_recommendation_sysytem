import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async () => {
    // validation
    if (!username.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        {
          username: username,
          password: password,
        }
      );

      alert(response.data.message || "Account Created Successfully");
      navigate("/login");

    } catch (error) {
      console.log("Signup Error:", error);

      if (error.response) {
        alert(error.response.data.message || "Signup Failed");
      } else {
        alert("Cannot connect to backend");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signup} disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>
      </div>
    </div>
  );
}

export default Signup;