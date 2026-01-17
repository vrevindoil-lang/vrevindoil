import { useState } from "react";
import "../assets/global.css";
import logo from "../assets/images/vr.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((prev) => !prev);
  const handleClose = () => setMenuOpen(false);

  return (
    <header className="vr-header">
      <div className="vr-header-container">
        {/* Logo Section */}
        <div className="vr-logo-area">
          <a href="#home" onClick={handleClose}>
            <img src={logo} alt="VR Naturals Logo" className="vr-logo-img" />
            <div className="vr-logo-text">
              <h2>VR Naturals</h2>
              <span>Pure Oils</span>
            </div>
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className={`vr-nav ${menuOpen ? "open" : ""}`}>
          <a href="#home" onClick={handleClose}>
            Home
          </a>
          <a href="#about" onClick={handleClose}>
            About
          </a>
          <a href="#products" onClick={handleClose}>
            Products
          </a>
          <a href="#contact" onClick={handleClose}>
            Contact
          </a>
          <button className="vr-order-btn mobile-only" onClick={handleClose}>
            Order Now
          </button>
        </nav>

        {/* CTA Button */}
        <button className="vr-order-btn desktop-only">Order Now</button>

        {/* Mobile Menu Toggle */}
        <button
          className={`vr-menu-toggle ${menuOpen ? "active" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={handleToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
