import React, { useState } from "react";
import axios from "axios";
import "./pages.css";

function Recommend({ user }) {

  const [problem, setProblem] = useState("");
  const [hairType, setHairType] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendation = async () => {

    setError("");
    setResult(null);

    if (!problem || !hairType) {
      setError("Please select both Hair Problem and Hair Type.");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/recommend",
        {
          username: user,
          problem,
          hair_type: hairType,
        }
      );

      setResult(response.data);

    } catch (err) {

      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect to the server.");
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="page">

      <div className="recommend-container">

        <h1 className="recommend-title">
          
          <span className="gradient-text">AI Hair Care</span>
  <br />
  <span className="gradient-text2">Recommendation</span>
  
</h1>

        <p className="recommend-desc">
          
          Select your hair problem and hair type to receive personalized
          natural hair care recommendations.
        </p>

        <div className="recommend-card">

          <h2>Hair Details</h2>

          <label>Hair Problem</label>

          <select
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          >
            <option value="">Select Hair Problem</option>
            <option value="Hair Fall">Hair Fall</option>
            <option value="Dandruff">Dandruff</option>
            <option value="Dry Hair">Dry Hair</option>
            <option value="Frizzy Hair">Frizzy Hair</option>
            <option value="Hair Growth">Hair Growth</option>
          </select>

          <label>Hair Type</label>

          <select
            value={hairType}
            onChange={(e) => setHairType(e.target.value)}
          >
            <option value="">Select Hair Type</option>
            <option value="Oily">Oily</option>
            <option value="Dry">Dry</option>
            <option value="Normal">Normal</option>
            <option value="Curly">Curly</option>
            <option value="Straight">Straight</option>
          </select>

          <button
            className="recommend-btn"
            onClick={getRecommendation}
            disabled={loading}
          >
            {loading ? "Finding..." : "Get Recommendation"}
          </button>

          {error && (
            <p className="error">{error}</p>
          )}

        </div>

        {loading && (
          <div className="loading-box">
            <div className="loader"></div>
            <h3>Analyzing Your Hair...</h3>
            <p>AI is preparing your personalized hair care routine.</p>
          </div>
        )}

        {result && (

          <div className="result-section">

            <h2>🌿 Personalized Hair Care Routine</h2>

            <p className="count">
              {result.count} Recommendation Found
            </p>

            {result.recommendations.map((item, index) => (

              <div
                key={index}
                className="recommend-result"
              >

                <div className="recommend-header">
                  🌸 Recommendation {index + 1}
                </div>

                <div className="result-grid">

                  <div className="info-card">
                    <h4>🌿 Ingredients</h4>
                    <p>{item.ingredients}</p>
                  </div>

                  <div className="info-card">
                    <h4>🥣 Preparation</h4>
                    <p>{item.preparation}</p>
                  </div>

                  <div className="info-card">
                    <h4>💆 Usage</h4>
                    <p>{item.usage}</p>
                  </div>

                  <div className="info-card">
                    <h4>📅 Frequency</h4>
                    <p>{item.frequency}</p>
                  </div>

                  <div className="info-card">
                    <h4>⚠ Precautions</h4>
                    <p>{item.precautions}</p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {!result && !loading && !error && (

          <div className="empty-state">

            <h3> Healthy Hair Starts Here</h3>

            <p>
              Choose your Hair Problem and Hair Type to receive
               natural hair care recommendations.
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default Recommend;