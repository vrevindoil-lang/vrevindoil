import React from "react";
import "../assets/global.css";
import { productsData } from "../data/products";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    window.scrollTo(0, 0);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="home-container" id="home">

      {/* PRODUCTS SECTION */}
      <div className="w-full pb-16" style={{ backgroundColor: "#ffffff", paddingTop: "40px" }} id="products">
        <div className="products-heading-section">
          <h2 className="products-heading">
            Our <span>Premium Products</span>
          </h2>
          <p className="products-subheading">
            Discover our collection of pure, natural oils that bring purity and health to your kitchen
          </p>
        </div>

        <div className="product-cards-container px-6 lg:px-20 mb-20">
          <div className="product-cards-grid">
            {productsData.map((product) => (
              <div 
                key={product.id}
                className="simple-product-card cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="simple-product-image">
                  <img src={product.frontImage} alt={product.name} />
                </div>
                <div className="simple-product-info">
                  <h3 className="simple-product-name">{product.name}</h3>
                  <p className="simple-product-desc">{product.sizes[0].price > 400 ? 'Premium selection' : 'Cold-pressed natural'}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.scrollTo(0, 0);
                      navigate(`/product/${product.id}`);
                    }} 
                    className="add-to-cart-btn"
                  >
                    🛒 Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
