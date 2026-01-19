import { useState, useEffect } from "react";
import "../assets/global.css";
import logo from "../assets/images/vr.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Get initial cart count - sum all quantities
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

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
        </nav>

        {/* CTA Button with Cart Count */}
        <button 
          className="vr-order-btn" 
          style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}
        >
          Order Now
          {cartCount > 0 && (
            <span style={{ 
              marginLeft: "8px", 
              fontWeight: "700",
              backgroundColor: "#e74c3c",
              color: "#fff",
              borderRadius: "50%",
              width: "26px",
              height: "26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px"
            }}>
              {cartCount}
            </span>
          )}
        </button>

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
