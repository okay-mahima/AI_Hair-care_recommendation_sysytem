import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pages.css";

function Dashboard({ user }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`https://ai-hair-care-recommendation-sysytem.onrender.com/history/${user}`)
        .then(res => setHistory(res.data));
    }
  }, [user]);

  return (
    <div className="page">
      <h2>📊 My History</h2>

      {history.map((h, i)=>(
        <div key={i} className="card">
          <p>{h.problem}</p>
          <p>{h.hair_type}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;