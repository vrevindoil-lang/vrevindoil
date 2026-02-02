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
    
    // Clear old localStorage data (migrate to sessionStorage only)
    localStorage.removeItem("cart");
    
    if (product) {
      // Load quantities from cart (using sessionStorage - clears on browser close)
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
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

    // Update sessionStorage (clears on browser close)
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
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

    sessionStorage.setItem("cart", JSON.stringify(cart));
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
      <div style={{ paddingTop: "140px", paddingBottom: "60px", paddingLeft: "40px", paddingRight: "40px" }}>
        {/* Back Button */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "6px 10px",
              backgroundColor: "#2d5016",
              border: "none",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600"
            }}
          >
            ←
          </button>
        </div>

        {/* Main Content - Full Width with Description on Top */}
        <div>
          
          {/* Product Title and Description - Full Width */}
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "clamp(24px, 6vw, 42px)", fontWeight: "700", color: "#1a1a1a", marginBottom: "20px" }}>
              {product.name}
            </h1>
            <p style={{ fontSize: "clamp(14px, 4vw, 18px)", lineHeight: "1.8", color: "#555", maxWidth: "900px" }}>
              {product.description}
            </p>
          </div>

          {/* Image and Size Selection Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(20px, 5vw, 50px)", marginBottom: "50px" }}>
            
            {/* Left - Image */}
            <div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "clamp(15px, 4vw, 30px)",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <img
                  src={product.backImage}
                  alt={product.name}
                  style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Right - Size Selection */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Size & Quantity Block */}
              <div style={{ backgroundColor: "#fff", padding: "clamp(15px, 4vw, 20px)", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: "700", marginBottom: "15px", color: "#2d5016" }}>
                  Select Size & Quantity
                </h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {product.sizes.map((size, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        padding: "10px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "6px",
                        border: "1px solid #e0e0e0"
                      }}
                    >
                      {/* Size and Price */}
                      <div>
                        <h4 style={{ fontSize: "clamp(11px, 3vw, 13px)", fontWeight: "700", color: "#2d5016", marginBottom: "2px" }}>
                          {size.size}
                        </h4>
                        <p style={{ fontSize: "clamp(11px, 3vw, 13px)", fontWeight: "700", color: "#333" }}>
                          ₹{size.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "space-between" }}>
                        <button
                          onClick={() => handleQuantityChange(size.size, -1)}
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: "#2d5016",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "700", color: "#2d5016" }}>
                          {quantities[size.size] || 0}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(size.size, 1)}
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: "#2d5016",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
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
                  <div style={{ backgroundColor: "#e8f4e0", padding: "12px 16px", borderRadius: "6px", borderLeft: "4px solid #2d5016", marginTop: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "clamp(12px, 3vw, 14px)", color: "#666" }}>Quantity:</span>
                        <span style={{ fontSize: "clamp(14px, 4vw, 18px)", fontWeight: "700", color: "#2d5016" }}>
                          {totalItems}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "clamp(12px, 3vw, 14px)", color: "#666" }}>Price:</span>
                        <span style={{ fontSize: "clamp(14px, 4vw, 18px)", fontWeight: "700", color: "#2d5016" }}>
                          ₹{totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div style={{ marginTop: "60px", paddingTop: "50px", borderTop: "2px solid #ddd", backgroundColor: "transparent" }}>
          <div className="py-16">
            <h2 style={{ fontSize: "clamp(20px, 6vw, 32px)", fontWeight: "700", marginBottom: "40px", color: "#2d5016", textAlign: "center" }}>
              Explore Our Other Products
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "clamp(15px, 4vw, 25px)" }}>
              {productsData
                .filter((p) => p.id !== productId)
                .map((relatedProduct) => {
                  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
                  const relatedCart = cart.filter((item) => item.productId === relatedProduct.id);
                  const relatedCount = relatedCart.reduce((sum, item) => sum + item.quantity, 0);
                  
                  return (
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
                        <h3 className="simple-product-name" style={{ fontSize: "clamp(12px, 3vw, 16px)" }}>{relatedProduct.name}</h3>
                        <p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#2d5016", fontWeight: "600" }}>
                          From ₹{relatedProduct.sizes[0].price}
                        </p>
                        {relatedCount > 0 && (
                          <p style={{ fontSize: "clamp(10px, 3vw, 12px)", color: "#fff", fontWeight: "700", backgroundColor: "#2d5016", padding: "4px 8px", borderRadius: "4px", marginTop: "8px", textAlign: "center" }}>
                            In Cart: {relatedCount}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
