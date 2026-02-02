import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/global.css";
import { productsData } from "../data/products";

const Products = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({
    coconut: 0,
    groundnut: 0,
    sunflower: 0,
    jaggery: 0,
    selectedSize: "1 Liter"
  });

  const handleProductClick = (productId) => {
    window.scrollTo(0, 0);
    navigate(`/product/${productId}`);
  };

  const totalItems = cart.coconut + cart.groundnut + cart.sunflower + cart.jaggery;

  return (
    <div className="w-full pb-16" style={{ backgroundColor: "#f8f5f0", paddingTop: "20px" }} id="products">

      {/* Heading */}
      <div className="products-heading-section">
        <h2 className="products-heading">
          Our <span>Premium Products</span>
        </h2>
        <p className="products-subheading">
          Discover our collection of pure, natural oils that bring purity and health to your kitchen
        </p>
      </div>

      {/* Image Cards - Product Grid */}
      <div className="product-cards-container px-6 lg:px-20 mb-20">
        <div className="product-cards-grid">
          {productsData.map((product) => (
            <div 
              key={product.id} hhh
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

      {/* Shopping Cart Summary */}
      {totalItems > 0 && (
        <div className="cart-summary px-6 lg:px-20 mb-20">
          <div className="cart-content">
            <div className="cart-items">
              <h3 className="cart-title">Shopping Cart</h3>
              <p className="cart-total-items">Total Items: <span className="items-count">{totalItems}</span></p>
            </div>
            
            <div className="size-selector">
              <label className="size-label">Select Size:</label>
              <select 
                className="size-select" 
                value={cart.selectedSize}
                onChange={(e) => setCart({...cart, selectedSize: e.target.value})}
              >
                <option>1 Liter - ₹380</option>
                <option>2 Liter - ₹760</option>
                <option>5 Liter - ₹1900</option>
                <option>15 Liter - ₹5700</option>
              </select>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}

     

     

      {/* Why Choose Section */}
      <section className="benefits-section">
        <h2 className="why-choose-heading">
          Why Choose <span className="text-green-600">VR Naturals?</span>
        </h2>
        <p className="why-choose-subheading">
          Experience the difference that pure, natural oils can make in your life
        </p>

        <div className="benefits-grid">

          <div className="benefit-card">
            <span className="benefit-icon">💚</span>
            <h3 className="benefit-title">Heart Healthy</h3>
            <p className="benefit-description">
              Rich in healthy fats that support cardiovascular wellness. Contains monounsaturated and polyunsaturated fats that help reduce bad cholesterol.
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">🌿</span>
            <h3 className="benefit-title">100% Natural</h3>
            <p className="benefit-description">
              No chemicals, preservatives, or additives. Sourced from trusted farmers practicing sustainable agriculture without pesticides.
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">🥗</span>
            <h3 className="benefit-title">Nutrient Rich</h3>
            <p className="benefit-description">
              Retains all vitamins, minerals & essential fatty acids. Cold-press process preserves vital nutrients including Vitamin E and antioxidants.
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">❄️</span>
            <h3 className="benefit-title">Cold Pressed</h3>
            <p className="benefit-description">
              Traditional method that preserves nutrients. No heat or chemicals are used, maintaining natural flavor and health properties.
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">🚫</span>
            <h3 className="benefit-title">Chemical Free</h3>
            <p className="benefit-description">
              No hexane or chemical extraction methods used. We avoid all synthetic solvents and harmful additives for pure essence.
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">🌱</span>
            <h3 className="benefit-title">Fresh & Pure</h3>
            <p className="benefit-description">
              Made in small batches for maximum freshness. Carefully crafted to ensure peak quality and taste with farm-to-table traceability.
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">�</span>
            <h3 className="benefit-title">Family Safe</h3>
            <p className="benefit-description">
              Safe for modern and traditional cooking. Suitable for all ages with rigorous quality testing for every family member.
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">🤝</span>
            <h3 className="benefit-title">Direct from Farmers</h3>
            <p className="benefit-description">
              Sourced directly from trusted farmers ensuring fair prices and freshest quality. Supporting local agriculture with transparency and integrity.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Products;