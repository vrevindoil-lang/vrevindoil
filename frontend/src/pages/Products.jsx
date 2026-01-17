import React, { useState } from "react";
import "../assets/global.css";
import coconut from "../assets/images/coconut.png";
import ground from "../assets/images/ground.png";
import sun from "../assets/images/sun.png";

const Products = () => {
  const [cart, setCart] = useState({
    coconut: 0,
    groundnut: 0,
    sunflower: 0,
    selectedSize: "1 Liter"
  });

  const addToCart = (product) => {
    setCart({
      ...cart,
      [product]: cart[product] + 1
    });
  };

  const removeFromCart = (product) => {
    if (cart[product] > 0) {
      setCart({
        ...cart,
        [product]: cart[product] - 1
      });
    }
  };

  const totalItems = cart.coconut + cart.groundnut + cart.sunflower;

  return (
    <div className="w-full pb-16" style={{ backgroundColor: "#f5f5f0", paddingTop: "140px" }} id="products">

      {/* Heading */}
      <div className="products-heading-section">
        <h2 className="products-heading">
          Our <span>Premium Oils</span>
        </h2>
        <p className="products-subheading">
          Starting with three essential oils that bring purity and health to your kitchen
        </p>
      </div>

      {/* Image Cards - 3 Cards Grid */}
      <div className="product-cards-container px-6 lg:px-20 mb-20">
        <div className="product-cards-grid">

          {/* Coconut Oil */}
          <div className="simple-product-card">
            <div className="simple-product-image">
              <img src={coconut} alt="Coconut Oil" />
            </div>
            <div className="simple-product-info">
              <h3 className="simple-product-name">Coconut Oil</h3>
              <p className="simple-product-desc">Cold-pressed virgin coconut oil</p>
              <button onClick={() => addToCart('coconut')} className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>

          {/* Groundnut Oil */}
          <div className="simple-product-card">
            <div className="simple-product-image">
              <img src={ground} alt="Groundnut Oil" />
            </div>
            <div className="simple-product-info">
              <h3 className="simple-product-name">Groundnut Oil</h3>
              <p className="simple-product-desc">Premium quality for Indian cooking</p>
              <button onClick={() => addToCart('groundnut')} className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>

          {/* Sunflower Oil */}
          <div className="simple-product-card">
            <div className="simple-product-image">
              <img src={sun} alt="Sunflower Oil" />
            </div>
            <div className="simple-product-info">
              <h3 className="simple-product-name">Sunflower Oil</h3>
              <p className="simple-product-desc">Light & healthy for everyday use</p>
              <button onClick={() => addToCart('sunflower')} className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>

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
                <option>500ml - ₹249</option>
                <option>1 Liter - ₹399</option>
                <option>2 Liter - ₹749</option>
                <option>5 Liter - ₹1799</option>
                <option>15 Liter - ₹4999</option>
              </select>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}

     

      {/* Sizes Section */}
      <div className="sizes-section px-6 lg:px-20">
        <h2 className="sizes-heading">
          Available Sizes
        </h2>

        <div className="sizes-grid">

          <div className="size-card">
            <h3 className="size-value">500ml</h3>
            <p className="size-description">Perfect for trying</p>
          </div>

          <div className="size-card">
            <h3 className="size-value">1 Liter</h3>
            <p className="size-description">Best for families</p>
          </div>

          <div className="size-card">
            <h3 className="size-value">2 Liters</h3>
            <p className="size-description">Great for regular use</p>
          </div>

          <div className="size-card popular">
            <span className="popular-badge">POPULAR</span>
            <h3 className="size-value">5 Liters</h3>
            <p className="size-description">Maximum value</p>
          </div>

          <div className="size-card">
            <h3 className="size-value">15 Liters</h3>
            <p className="size-description">Bulk buying</p>
          </div>
        </div>
      </div>

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