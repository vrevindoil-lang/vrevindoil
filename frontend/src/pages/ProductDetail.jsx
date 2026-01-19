import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/global.css";
import { productsData } from "../data/products";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((p) => p.id === productId);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (product) {
      // Load quantities from cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const initial = {};
      
      product.sizes.forEach((size) => {
        const cartItem = cart.find(
          (item) => item.productId === product.id && item.size === size.size
        );
        initial[size.size] = cartItem ? cartItem.quantity : 0;
      });
      setQuantities(initial);
    }
  }, [product, productId]);

  if (!product) {
    return (
      <div style={{ paddingTop: "200px", textAlign: "center", minHeight: "100vh" }}>
        <h1>Product not found</h1>
        <button onClick={() => navigate("/")} className="add-to-cart-btn" style={{ marginTop: "20px" }}>
          Back to Products
        </button>
      </div>
    );
  }

  const handleQuantityChange = (size, delta) => {
    const newQuantity = Math.max(0, quantities[size] + delta);
    
    // Update state
    setQuantities((prev) => ({
      ...prev,
      [size]: newQuantity
    }));

    // Update localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(
      (item) => item.productId === product.id && item.size === size
    );

    if (newQuantity === 0) {
      // Remove item if quantity is 0
      if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
      }
    } else {
      // Update or add item
      const sizeInfo = product.sizes.find((s) => s.size === size);
      if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
      } else {
        cart.push({
          productId: product.id,
          productName: product.name,
          size: size,
          price: sizeInfo.price,
          quantity: newQuantity
        });
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, q) => sum + q, 0);
  };

  const calculateTotal = () => {
    let total = 0;
    product.sizes.forEach((size) => {
      total += quantities[size.size] * size.price;
    });
    return total;
  };

  const totalItems = getTotalItems();
  const totalPrice = calculateTotal();

  return (
    <div className="w-full" style={{ backgroundColor: "#f5f5f0", minHeight: "100vh" }}>
      <div style={{ paddingTop: "140px", paddingBottom: "60px" }}>
        {/* Back Button */}
        <div className="px-6 lg:px-20 mb-12">
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              border: "2px solid #2d5016",
              color: "#2d5016",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            ← Back to Products
          </button>
        </div>

        {/* Main Content - Full Width with Description on Top */}
        <div className="px-6 lg:px-20">
          
          {/* Product Title and Description - Full Width */}
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "42px", fontWeight: "700", color: "#1a1a1a", marginBottom: "20px" }}>
              {product.name}
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", maxWidth: "900px" }}>
              {product.description}
            </p>
          </div>

          {/* Image and Size Selection Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", marginBottom: "50px" }}>
            
            {/* Left - Image */}
            <div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "30px",
                  minHeight: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <img
                  src={product.backImage}
                  alt={product.name}
                  style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Right - Size Selection */}
            <div>
              <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "25px", color: "#2d5016" }}>
                  Select Size & Quantity
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {product.sizes.map((size, index) => (
                    <div
                      key={index}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: "15px",
                        alignItems: "center",
                        padding: "15px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0"
                      }}
                    >
                      {/* Size and Price */}
                      <div>
                        <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#2d5016", marginBottom: "3px" }}>
                          {size.size}
                        </h4>
                        <p style={{ fontSize: "16px", fontWeight: "700", color: "#333" }}>
                          ₹{size.price}
                        </p>
                      </div>

                      {/* Spacer */}
                      <div></div>

                      {/* Quantity Controls */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button
                          onClick={() => handleQuantityChange(size.size, -1)}
                          style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#2d5016",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: "18px", fontWeight: "700", minWidth: "28px", textAlign: "center", color: "#2d5016" }}>
                          {quantities[size.size] || 0}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(size.size, 1)}
                          style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#2d5016",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                {totalItems > 0 && (
                  <div style={{ backgroundColor: "#e8f4e0", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #2d5016", marginTop: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                      <div>
                        <p style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>Total Items</p>
                        <p style={{ fontSize: "24px", fontWeight: "700", color: "#2d5016" }}>
                          {totalItems}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>Total Price</p>
                        <p style={{ fontSize: "24px", fontWeight: "700", color: "#2d5016" }}>
                          ₹{totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Why Choose This Product - Full Width */}
          <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "25px", color: "#2d5016" }}>
              ✓ Why Choose This Product
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px" }}>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#2d5016", marginBottom: "8px" }}>100% Natural & Cold-Pressed</p>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  Extracted using traditional cold-press methods without any heat or chemicals.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#2d5016", marginBottom: "8px" }}>No Chemicals or Preservatives</p>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  Pure essence with no artificial additives, keeping it safe for families.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#2d5016", marginBottom: "8px" }}>Rich in Essential Nutrients</p>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  Packed with vitamins, minerals, and antioxidants for your health.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#2d5016", marginBottom: "8px" }}>Perfect for Cooking & Health</p>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  Ideal for daily cooking, baking, and personal wellness routines.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#2d5016", marginBottom: "8px" }}>Sourced from Trusted Farmers</p>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  Direct from reliable farmers practicing sustainable agriculture.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#2d5016", marginBottom: "8px" }}>Fresh & Pure Quality</p>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  Made in small batches ensuring peak freshness and authentic taste.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div style={{ marginTop: "60px", paddingTop: "50px", borderTop: "2px solid #ddd", backgroundColor: "#fff" }}>
          <div className="px-6 lg:px-20 py-16">
            <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "40px", color: "#2d5016", textAlign: "center" }}>
              Explore Our Other Products
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "25px" }}>
              {productsData
                .filter((p) => p.id !== productId)
                .map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/product/${relatedProduct.id}`);
                    }}
                    className="simple-product-card"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="simple-product-image">
                      <img src={relatedProduct.frontImage} alt={relatedProduct.name} />
                    </div>
                    <div className="simple-product-info">
                      <h3 className="simple-product-name">{relatedProduct.name}</h3>
                      <p style={{ fontSize: "13px", color: "#2d5016", fontWeight: "600" }}>
                        From ₹{relatedProduct.sizes[0].price}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
