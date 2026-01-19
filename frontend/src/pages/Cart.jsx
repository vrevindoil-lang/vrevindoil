import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/global.css";
import { productsData } from "../data/products";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(cart);
    setLoading(false);
  };

  const handleQuantityChange = (productId, size, delta) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (itemIndex > -1) {
      const newQuantity = Math.max(0, cart[itemIndex].quantity + delta);
      
      if (newQuantity === 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = newQuantity;
      }
      
      sessionStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      loadCart();
    }
  };

  const handleRemoveItem = (productId, size) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    loadCart();
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  if (loading) {
    return (
      <div style={{ paddingTop: "200px", textAlign: "center", minHeight: "100vh" }}>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ backgroundColor: "#f5f5f0", minHeight: "100vh" }}>
      <div style={{ paddingTop: "140px", paddingBottom: "60px", paddingLeft: "40px", paddingRight: "40px" }}>
        {/* Back Button */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
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
            ← Back
          </button>
        </div>

        {/* Page Title */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(28px, 6vw, 42px)", fontWeight: "700", color: "#1a1a1a", marginBottom: "10px" }}>
            Your Cart
          </h1>
          <p style={{ fontSize: "clamp(14px, 4vw, 16px)", color: "#666" }}>
            {cartItems.length === 0 ? "Your cart is empty" : `${getTotalItems()} items in cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🛒</div>
            <h2 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: "600", color: "#333", marginBottom: "15px" }}>
              Your cart is empty
            </h2>
            <p style={{ fontSize: "clamp(14px, 4vw, 16px)", color: "#666", marginBottom: "30px" }}>
              Add some products to get started!
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "12px 30px",
                backgroundColor: "#2d5016",
                border: "none",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600"
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", maxWidth: "1200px" }}>
            {/* Cart Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {cartItems.map((item, index) => {
                const product = productsData.find((p) => p.id === item.productId);
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#fff",
                      padding: "clamp(15px, 4vw, 20px)",
                      borderRadius: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      gap: "clamp(15px, 4vw, 20px)",
                      alignItems: "center"
                    }}
                  >
                    {/* Product Image */}
                    {product && (
                      <div
                        onClick={() => navigate(`/product/${product.id}`)}
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "8px",
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer"
                        }}
                      >
                        <img
                          src={product.frontImage}
                          alt={product.name}
                          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                        />
                      </div>
                    )}

                    {/* Product Details */}
                    <div style={{ minWidth: 0 }}>
                      <h3
                        onClick={() => product && navigate(`/product/${product.id}`)}
                        style={{
                          fontSize: "clamp(14px, 4vw, 18px)",
                          fontWeight: "700",
                          color: "#2d5016",
                          marginBottom: "5px",
                          cursor: "pointer"
                        }}
                      >
                        {item.productName}
                      </h3>
                      <p style={{ fontSize: "clamp(12px, 3vw, 14px)", color: "#666", marginBottom: "8px" }}>
                        Size: {item.size}
                      </p>
                      <p style={{ fontSize: "clamp(13px, 3vw, 16px)", fontWeight: "700", color: "#333" }}>
                        ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.size, -1)}
                          style={{
                            width: "32px",
                            height: "32px",
                            backgroundColor: "#2d5016",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: "700", color: "#2d5016", minWidth: "30px", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.size, 1)}
                          style={{
                            width: "32px",
                            height: "32px",
                            backgroundColor: "#2d5016",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
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
                      <button
                        onClick={() => handleRemoveItem(item.productId, item.size)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "transparent",
                          border: "1px solid #d32f2f",
                          color: "#d32f2f",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "clamp(11px, 3vw, 13px)",
                          fontWeight: "600"
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "clamp(20px, 5vw, 30px)",
                borderRadius: "10px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                position: "sticky",
                top: "160px"
              }}
            >
              <h2 style={{ fontSize: "clamp(18px, 5vw, 24px)", fontWeight: "700", color: "#2d5016", marginBottom: "20px" }}>
                Order Summary
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "clamp(14px, 4vw, 16px)" }}>
                  <span style={{ color: "#666" }}>Total Items:</span>
                  <span style={{ fontWeight: "700", color: "#333" }}>{getTotalItems()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "clamp(14px, 4vw, 16px)" }}>
                  <span style={{ color: "#666" }}>Subtotal:</span>
                  <span style={{ fontWeight: "700", color: "#333" }}>₹{calculateTotal()}</span>
                </div>
                <div style={{ borderTop: "2px solid #e0e0e0", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "clamp(16px, 5vw, 20px)" }}>
                  <span style={{ fontWeight: "700", color: "#2d5016" }}>Total:</span>
                  <span style={{ fontWeight: "700", color: "#2d5016" }}>₹{calculateTotal()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Order functionality coming soon! Your cart:\n\n" + 
                    cartItems.map(item => `${item.productName} (${item.size}) × ${item.quantity}`).join("\n"));
                }}
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "#2d5016",
                  border: "none",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "clamp(14px, 4vw, 18px)",
                  fontWeight: "700",
                  marginBottom: "10px"
                }}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/")}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "transparent",
                  border: "2px solid #2d5016",
                  color: "#2d5016",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "clamp(14px, 4vw, 16px)",
                  fontWeight: "600"
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
