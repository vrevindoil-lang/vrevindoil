import React, { useState } from "react";
import "../assets/global.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    product: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="w-full pb-16" style={{ backgroundColor: "#f5f5f0", paddingTop: "140px" }} id="contact">
      {/* Heading */}
      <div className="contact-heading-section">
        <h2 className="contact-heading">
          Get in <span>Touch</span>
        </h2>
        <p className="contact-subheading">
          Interested in our pure natural oils? Contact us for orders, inquiries, or to learn more
          about our products.
        </p>
      </div>

      {/* Contact Content */}
      <div className="contact-content-wrapper px-6 lg:px-20 mb-20">
        <div className="contact-grid">

          {/* Contact Information */}
          <div className="contact-info-section">
            <h3 className="contact-info-title">Contact Information</h3>
            <p className="contact-info-subtitle">
              We're here to help! Reach out to us through any of these channels.
            </p>

            {/* Phone */}
            <div className="contact-info-card">
              <div className="contact-info-icon">☎️</div>
              <div className="contact-info-details">
                <h4 className="contact-info-label">Phone</h4>
                <p className="contact-info-text">+91 98765 43210</p>
                <p className="contact-info-text">+91 98765 43211</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-info-card">
              <div className="contact-info-icon">✉️</div>
              <div className="contact-info-details">
                <h4 className="contact-info-label">Email</h4>
                <p className="contact-info-text">info@vrnaturals.com</p>
                <p className="contact-info-text">orders@vrnaturals.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div className="contact-info-details">
                <h4 className="contact-info-label">Address</h4>
                <p className="contact-info-text">VR Naturals Oil Mill</p>
                <p className="contact-info-text">Industrial Area, Sector 5</p>
                <p className="contact-info-text">Chennai, Tamil Nadu - 600001</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="contact-info-card">
              <div className="contact-info-icon">🕒</div>
              <div className="contact-info-details">
                <h4 className="contact-info-label">Business Hours</h4>
                <p className="contact-info-text">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="contact-info-text">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h3 className="contact-form-title">Send us a Message</h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="product" className="form-label">Interested Product *</label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select a product</option>
                  <option value="coconut">Coconut Oil</option>
                  <option value="groundnut">Groundnut Oil</option>
                  <option value="sunflower">Sunflower Oil</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  className="form-input form-textarea"
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
