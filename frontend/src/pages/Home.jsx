import React from "react";
import "../assets/global.css";
import oilImage from "../assets/images/oil.jpg";

const Home = () => {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section">
        {/* Animated background orbs */}
        <div className="hero-anim" aria-hidden="true">
          <span className="orb orb-a"></span>
          <span className="orb orb-b"></span>
          <span className="orb orb-c"></span>
        </div>

        {/* Left Content */}
        <div className="hero-left">

          <h1 className="hero-title">
            Pure Natural Oils, <br />
            <span className="highlight">Naturally Healthy</span>
          </h1>

          <p className="hero-text">
            Experience the goodness of nature with VR Naturals. We bring you
            premium quality, cold-pressed oils that are 100% pure, natural, and
            packed with nutrients.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">View Products</button>
            <button className="btn-outline">Learn More</button>
          </div>

          <div className="hero-stats">
            <div>
              <h2>100%</h2>
              <p>Pure & Natural</p>
            </div>
            <div>
              <h2>0%</h2>
              <p>Chemicals</p>
            </div>
            <div>
              <h2>3</h2>
              <p>Premium Oils</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-right">
          <img src={oilImage} alt="oil" className="hero-image" />
        </div>
      </section>

    </div>
  );
};

export default Home;
