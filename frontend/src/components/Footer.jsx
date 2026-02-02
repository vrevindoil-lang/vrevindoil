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
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#about">About Us</a>
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
            <a href="tel:7338556876" className="footer-contact-link">
              7338556876
            </a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">✉️</span>
            <a href="mailto:vrevind.oil@gmail.com" className="footer-contact-link">
              vrevind.oil@gmail.com
            </a>
          </div>

          {/* Follow Us */}
          <div className="footer-follow-section">
            <h5 className="footer-follow-title">Follow Us</h5>
            <div className="footer-social-links">
              <a href="#youtube" className="social-icon" title="YouTube" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 8.2a2.6 2.6 0 0 0-1.8-1.8C18.7 6 12 6 12 6s-6.7 0-8.2.4A2.6 2.6 0 0 0 2 8.2 27.6 27.6 0 0 0 2 15.8a2.6 2.6 0 0 0 1.8 1.8C5.3 18 12 18 12 18s6.7 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8A27.6 27.6 0 0 0 22 8.2z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 14.2l5-2.6-5-2.6v5.2z" fill="#fff"/></svg>
              </a>
              <a href="#instagram" className="social-icon" title="Instagram" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3.2" stroke="#fff" strokeWidth="1.2"/><circle cx="18.5" cy="5.5" r="0.6" fill="#fff"/></svg>
              </a>
              <a href="#facebook" className="social-icon" title="Facebook" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#twitter" className="social-icon" title="Twitter" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 4l14 16M19 4L5 20" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#linkedin" className="social-icon" title="LinkedIn" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2c-1.2 0-2 .8-2 2v6h-4v-12h4v2.2c.7-1 1.9-1.2 3-1.2zM2 9h4v12H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="#fff"/></svg>
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
