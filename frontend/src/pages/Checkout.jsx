import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/global.css";
import { productsData } from "../data/products";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(cart);

    const saved = JSON.parse(sessionStorage.getItem("checkoutInfo"));
    if (saved) setForm((prev) => ({ ...prev, ...saved }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone)) next.phone = "Enter 10-digit phone";
    if (form.email && !/.+@.+\..+/.test(form.email)) next.email = "Invalid email";
    if (!form.address1.trim()) next.address1 = "Address is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.state.trim()) next.state = "State is required";
    if (!/^\d{6}$/.test(form.pincode)) next.pincode = "6-digit pincode";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before placing the order.");
      return;
    }

    sessionStorage.setItem("checkoutInfo", JSON.stringify(form));

    const lines = [];
    lines.push("New Order Request - VR Naturals");
    lines.push("");
    lines.push(`Name: ${form.name}`);
    lines.push(`Phone: ${form.phone}`);
    lines.push(`Email: ${form.email || "-"}`);
    lines.push(`Address: ${form.address1}${form.address2 ? ", " + form.address2 : ""}`);
    lines.push(`City/State: ${form.city}, ${form.state}`);
    lines.push(`Pincode: ${form.pincode}`);
    if (form.notes) lines.push(`Notes: ${form.notes}`);
    lines.push("");
    lines.push("Items:");
    cartItems.forEach((item) => {
      lines.push(`• ${item.productName} (${item.size}) × ${item.quantity} = ₹${item.price * item.quantity}`);
    });
    lines.push("");
    lines.push(`Total Items: ${getTotalItems()}`);
    lines.push(`Total Amount: ₹${calculateTotal()}`);

    const message = lines.join("\n");
    // Open chat to business on WhatsApp (optional)
    const encoded = encodeURIComponent(message);
    const businessNumber = "919606399923"; // India country code +91
    const url = `https://wa.me/${businessNumber}?text=${encoded}`;
    window.open(url, "_blank");

    // Also send an acknowledgement to the customer via backend (from 9606399923)
    const ackLines = [];
    ackLines.push("Thank you for your order with VR Naturals! ✅");
    ackLines.push("");
    ackLines.push(`Hi ${form.name}, your order has been placed.`);
    ackLines.push("Order Summary:");
    cartItems.forEach((item) => {
      ackLines.push(`• ${item.productName} (${item.size}) × ${item.quantity} = ₹${item.price * item.quantity}`);
    });
    ackLines.push("");
    ackLines.push(`Total Items: ${getTotalItems()}`);
    ackLines.push(`Total Amount: ₹${calculateTotal()}`);
    ackLines.push("");
    ackLines.push("We’ll contact you shortly for delivery details.\n— Team VR Naturals");

    const ackMessage = ackLines.join("\n");
    const customerPhone = form.phone;

    // Fire-and-forget POST to backend; ignore errors for UX
    fetch("http://localhost:3001/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: customerPhone, message: ackMessage })
    }).catch(() => {});
  };

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
              fontWeight: "600",
            }}
          >
            ← Back
          </button>
        </div>

        <div className="checkout-container">
          {/* Title */}
          <div>
            <h1 style={{ fontSize: "clamp(28px, 6vw, 42px)", fontWeight: "700", color: "#1a1a1a", marginBottom: "10px" }}>
              Checkout
            </h1>
            <p style={{ fontSize: "clamp(14px, 4vw, 16px)", color: "#666" }}>
              Please fill your details to place the order
            </p>
          </div>

          <div className="checkout-grid">
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", padding: "clamp(20px, 5vw, 28px)", borderRadius: "10px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div className="checkout-form-grid">
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" style={{ width: "100%", padding: 12, borderRadius: 6, border: `1px solid ${errors.name ? "#e74c3c" : "#ddd"}` }} />
                  {errors.name && <small style={{ color: "#e74c3c" }}>{errors.name}</small>}
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit phone" style={{ width: "100%", padding: 12, borderRadius: 6, border: `1px solid ${errors.phone ? "#e74c3c" : "#ddd"}` }} />
                  {errors.phone && <small style={{ color: "#e74c3c" }}>{errors.phone}</small>}
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Email</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" style={{ width: "100%", padding: 12, borderRadius: 6, border: `1px solid ${errors.email ? "#e74c3c" : "#ddd"}` }} />
                  {errors.email && <small style={{ color: "#e74c3c" }}>{errors.email}</small>}
                </div>
                <div></div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Address Line 1 *</label>
                  <input name="address1" value={form.address1} onChange={handleChange} placeholder="House no., street" style={{ width: "100%", padding: 12, borderRadius: 6, border: `1px solid ${errors.address1 ? "#e74c3c" : "#ddd"}` }} />
                  {errors.address1 && <small style={{ color: "#e74c3c" }}>{errors.address1}</small>}
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Address Line 2</label>
                  <input name="address2" value={form.address2} onChange={handleChange} placeholder="Area, landmark (optional)" style={{ width: "100%", padding: 12, borderRadius: 6, border: "1px solid #ddd" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>City *</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" style={{ width: "100%", padding: 12, borderRadius: 6, border: `1px solid ${errors.city ? "#e74c3c" : "#ddd"}` }} />
                  {errors.city && <small style={{ color: "#e74c3c" }}>{errors.city}</small>}
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>State *</label>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="State" style={{ width: "100%", padding: 12, borderRadius: 6, border: `1px solid ${errors.state ? "#e74c3c" : "#ddd"}` }} />
                  {errors.state && <small style={{ color: "#e74c3c" }}>{errors.state}</small>}
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Pincode *</label>
                  <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" style={{ width: "100%", padding: 12, borderRadius: 6, border: `1px solid ${errors.pincode ? "#e74c3c" : "#ddd"}` }} />
                  {errors.pincode && <small style={{ color: "#e74c3c" }}>{errors.pincode}</small>}
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Notes</label>
                  <input name="notes" value={form.notes} onChange={handleChange} placeholder="Any delivery instructions" style={{ width: "100%", padding: 12, borderRadius: 6, border: "1px solid #ddd" }} />
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <button type="submit" style={{
                  padding: "12px 28px",
                  backgroundColor: "#2d5016",
                  border: "none",
                  color: "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "700",
                }}>
                  Place Order
                </button>
              </div>
            </form>

            {/* Order summary */}
            <div style={{ backgroundColor: "#fff", padding: "clamp(20px, 5vw, 28px)", borderRadius: "10px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: "700", color: "#2d5016", marginBottom: "12px" }}>Order Summary</h3>
              {cartItems.length === 0 ? (
                <p style={{ color: "#666" }}>Your cart is empty.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {cartItems.map((item, idx) => {
                    const product = productsData.find((p) => p.id === item.productId);
                    return (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          {product && (
                            <img src={product.frontImage} alt={product.name} style={{ width: 40, height: 40, objectFit: "contain" }} />
                          )}
                          <div>
                            <div style={{ fontWeight: 700, color: "#333" }}>{item.productName}</div>
                            <small style={{ color: "#666" }}>{item.size}</small>
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, color: "#2d5016" }}>₹{item.price * item.quantity}</div>
                      </div>
                    );
                  })}

                  <div style={{ borderTop: "2px solid #e0e0e0", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, color: "#2d5016" }}>Total ({getTotalItems()} items)</span>
                    <span style={{ fontWeight: 700, color: "#2d5016" }}>₹{calculateTotal()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
