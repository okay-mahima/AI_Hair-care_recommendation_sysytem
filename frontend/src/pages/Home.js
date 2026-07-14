import React from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css";

import heroImg from "../assets/pic_1.avif";
import feature1 from "../assets/pic_2.avif";
import feature2 from "../assets/pic_4.avif";
import feature3 from "../assets/pic_7.avif";
import aboutImg from "../assets/pic_5.avif";
import ctaImg from "../assets/pic_6.avif";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Navbar */}

      <nav className="navbar">

        <h2 className="logo"> AI Beauty Care</h2>

        <div className="nav-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>

      </nav>

      {/* Hero Section */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-text">

            <h1>Healthy Hair Starts Here </h1>

            <h2>Your Personal AI Hair Care Assistant</h2>

            <p>
              Discover personalized hair care routines based on your
              hair type and hair concerns.
            </p>

            <p>
              Whether you're struggling with hair fall, dandruff,
              dry hair or frizz, AI Beauty Care helps you find
              natural and effective remedies made just for you.
            </p>

            <button onClick={() => navigate("/signup")}>
              Get Started
            </button>

          </div>

          <div className="hero-image">

            <img src={heroImg} alt="Hair Care" />

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features-section">

        <h2>Why Choose AI Beauty Care?</h2>

        <div className="features">

          <div className="feature-card">

            <img src={feature1} alt="AI" />

            <h3> AI Powered</h3>

            <p>
              Receive smart recommendations specially generated for
              your hair condition.
            </p>

          </div>

          <div className="feature-card">

            <img src={feature2} alt="Natural" />

            <h3> Natural Ingredients</h3>

            <p>
              Get remedies prepared using trusted natural ingredients
              like Aloe Vera, Coconut Oil and Onion Juice.
            </p>

          </div>

          <div className="feature-card">

            <img src={feature3} alt="Routine" />

            <h3> Personalized Routine</h3>

            <p>
              Follow step-by-step preparation, usage,
              frequency and precautions.
            </p>

          </div>

        </div>

      </section>

      {/* How It Works */}

      <section className="steps-section">

        <h2>How It Works</h2>

        <div className="steps">

          <div className="step-card">

            <h3>1️⃣ Sign Up</h3>

            <p>Create your account in just a few seconds.</p>

          </div>

          <div className="step-card">

            <h3>2️⃣ Select Hair Details</h3>

            <p>
              Choose your hair type and hair problem.
            </p>

          </div>

          <div className="step-card">

            <h3>3️⃣ Get Recommendations</h3>

            <p>
              Instantly receive personalized AI-based
              hair care routines.
            </p>

          </div>

        </div>

      </section>

      {/* About */}

      <section className="about-section">

        <div className="about-image">

          <img src={aboutImg} alt="About" />

        </div>

        <div className="about-content">

          <h2>About AI Beauty Care</h2>

          <p>
            AI Beauty Care System is designed to help users discover
            personalized hair care routines using Artificial Intelligence.
            We combine natural remedies with intelligent recommendations
            to make healthy hair care simple and effective.
          </p>

        </div>

      </section>

      {/* CTA */}

      <section
        className="cta-section"
        style={{
          backgroundImage: `url(${ctaImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="cta-overlay">

          <h2>Ready to Transform Your Hair?</h2>

          <p>
            Join AI Beauty Care today and receive
            customized hair care recommendations.
          </p>

          <button onClick={() => navigate("/signup")}>
            Join Now
          </button>

        </div>

      </section>

      {/* Footer */}

      <footer className="footer">

        
        <p>© 2026 AI Beauty Care System</p>

      </footer>

    </div>
  );
}

export default Home;