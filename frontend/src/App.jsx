import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import banner1 from "./assets/images/banner1.png";
import "./assets/global.css";

function AppContent() {
  const location = useLocation();
  const showBanner = location.pathname === "/";

  return (
    <>
      {showBanner && (
        <div 
          className="banner-container"
          style={{ 
            width: "100vw", 
            padding: 0, 
            margin: 0,
            marginTop: "90px",
            marginLeft: "calc(-50vw + 50%)", 
            overflow: "hidden",
            position: "relative",
            zIndex: 1
          }}>
          <img 
            src={banner1} 
            alt="banner" 
            className="banner-image"
            style={{
              width: "100%",
              display: "block",
              backgroundColor: "#ffffff",
              animation: "fadeInDown 0.6s ease-out"
            }}
          />
          <style>{`
            .banner-container {
              height: auto;
            }
            .banner-image {
              height: auto;
              object-fit: fill;
            }
            @media (max-width: 520px) {
              .banner-container {
                margin-top: 84px !important;
              }
            }
            @media (min-width: 521px) and (max-width: 1024px) {
              .banner-container {
                margin-top: 110px !important;
              }
            }
            @media (min-width: 768px) {
              .banner-image {
                height: 100%;
                object-fit: fill;
              }
            }
            @media (min-width: 768px) {
              .banner-container {
                height: clamp(350px, 40vw, 500px);
              }
            }
            @keyframes fadeInDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Contact />
            </>
          }
        />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <AppContent />
      <Footer />
    </Router>
  );
}

export default App;
