import aboutImage from "../assets/images/about.png";


function About() {
  return (
    <section className="about-section">
      {/* Title */}
      <div className="about-header">
        <h1>
          About <span>VR Naturals</span>
        </h1>
        <p>
          Your trusted source for pure, natural cooking oils that bring health
          and flavor to every meal
        </p>
      </div>

      {/* Content */}
      <div className="about-content">
        {/* Left */}
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            At VR Naturals, we believe in the power of nature. Our mission is to
            provide families with the highest quality, pure cooking oils that
            are free from chemicals, preservatives, and artificial additives.
          </p>

          <p>
            We carefully source our raw materials and use traditional cold-press
            methods to ensure that every drop of oil retains its natural
            nutrients, flavor, and aroma. Our commitment to quality and purity
            makes us the preferred choice for health-conscious families.
          </p>

          <div className="about-features">
            <div className="feature-card green">
              <span className="feature-icon">🌿</span>
              <h4>100% Natural</h4>
              <p>No chemicals or additives</p>
            </div>

            <div className="feature-card yellow">
              <span className="feature-icon">❤</span>
              <h4>Heart Healthy</h4>
              <p>Rich in nutrients</p>
            </div>

            <div className="feature-card green">
              <span className="feature-icon">✔</span>
              <h4>Quality Tested</h4>
              <p>Rigorous quality checks</p>
            </div>

            <div className="feature-card yellow">
              <span className="feature-icon">⭐</span>
              <h4>Premium Grade</h4>
              <p>Best quality oils</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="about-image">
          <img
            src={aboutImage}
            alt="Oil production"
          />
        </div>
      </div>

      {/* Our Process Section */}
      <div className="our-process">
        <h2>Our Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-circle step-1">1</div>
            <h3>Source Selection</h3>
            <p>We carefully select the finest quality raw materials from trusted farmers</p>
          </div>

          <div className="process-step">
            <div className="step-circle step-2">2</div>
            <h3>Cold Pressing</h3>
            <p>Traditional cold-press method preserves nutrients and natural flavor</p>
          </div>

          <div className="process-step">
            <div className="step-circle step-3">3</div>
            <h3>Quality Testing</h3>
            <p>Rigorous quality checks ensure every bottle meets our high standards</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
