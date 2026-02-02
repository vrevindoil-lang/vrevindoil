import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/global.css";
import logo from "../assets/images/vr.png";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Get initial cart count - sum all quantities from sessionStorage
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const totalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const handleToggle = () => setMenuOpen((prev) => !prev);
  const handleClose = () => setMenuOpen(false);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    handleClose();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="vr-header">
      <div className="vr-header-container">
        {/* Logo Section */}
        <div className="vr-logo-area">
          <a href="#home" onClick={(e) => handleNavClick(e, "home")}>
            <img src={logo} alt="VR Naturals Logo" className="vr-logo-img" />
            <div className="vr-logo-text">
              <h2>VR Naturals</h2>
            </div>
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className={`vr-nav ${menuOpen ? "open" : ""}`}>
          <a href="#products" onClick={(e) => handleNavClick(e, "products")}>
            Products
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
            About
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
            Contact
          </a>
        </nav>

        {/* CTA Button with Cart Count - Hidden on mobile until cart has items */}
        <button 
          className="vr-order-btn" 
          onClick={() => navigate("/cart")}
          style={{ 
            display: cartCount > 0 ? "flex" : "none",
            alignItems: "center", 
            gap: "8px", 
            position: "relative",
            "@media (min-width: 768px)": {
              display: "flex"
            }
          }}
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
