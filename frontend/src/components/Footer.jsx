import React from "react";
import "../assets/global.css";
import logo from "../assets/images/vr.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo & Description */}
        <div className="footer-section footer-about">
          <div className="footer-logo-area">
            <a href="#home" className="footer-logo-link">
              <img src={logo} alt="VR Naturals Logo" className="footer-logo-img" />
              <div className="footer-logo-text">
                <h3 className="footer-logo-name">VR Naturals</h3>
                <p className="footer-logo-subtitle">Pure Oils</p>
              </div>
            </a>
          </div>
          <p className="footer-description">
            Your trusted source for 100% pure, natural cooking oils that bring health and flavor to
            every meal.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-section-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Our Products */}
        <div className="footer-section">
          <h4 className="footer-section-title">Our Products</h4>
          <ul className="footer-links">
            <li>
              <a href="#products">Pure Coconut Oil</a>
            </li>
            <li>
              <a href="#products">Pure Groundnut Oil</a>
            </li>
            <li>
              <a href="#products">Pure Sunflower Oil</a>
            </li>
          </ul>
          <div className="footer-badge">
            <p className="footer-badge-text">100% Natural</p>
            <p className="footer-badge-text">No Chemicals Added</p>
          </div>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h4 className="footer-section-title">Contact Us</h4>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📞</span>
            <a href="tel:+919876543210" className="footer-contact-link">
              +91 98765 43210
            </a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">✉️</span>
            <a href="mailto:info@vrnaturals.com" className="footer-contact-link">
              info@vrnaturals.com
            </a>
          </div>

          {/* Follow Us */}
          <div className="footer-follow-section">
            <h5 className="footer-follow-title">Follow Us</h5>
            <div className="footer-social-links">
              <a href="#facebook" className="social-icon" title="Facebook">
                f
              </a>
              <a href="#instagram" className="social-icon" title="Instagram">
                📷
              </a>
              <a href="#twitter" className="social-icon" title="Twitter">
                𝕏
              </a>
              <a href="#youtube" className="social-icon" title="YouTube">
                ▶️
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 VR Naturals Oil. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#ssl">SSL License</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
