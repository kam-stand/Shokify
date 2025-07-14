import React, { useState, useEffect } from "react";
import "../styles.css/payment.css";

const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      street: "",
      city: "",
      postalCode: "",
      country: "UK",
    },
  });

  const [orderSummary, setOrderSummary] = useState({
    items: [],
    subtotal: 0,
    shipping: 5.99,
    tax: 0,
    total: 0,
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    fetchOrderSummary();
    fetchPaymentMethods();
  }, []);

  const fetchOrderSummary = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/checkout/summary"
      );
      if (response.ok) {
        const data = await response.json();
        setOrderSummary(data);
      }
    } catch (err) {
      // Mock order summary for demo
      const mockItems = [
        { id: 1, name: "New Look trench coat", price: 49.99, quantity: 1 },
        { id: 2, name: "Nike Running jacket", price: 84.95, quantity: 1 },
      ];

      const subtotal = mockItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const tax = subtotal * 0.2; // 20% VAT
      const total = subtotal + 5.99 + tax;

      setOrderSummary({
        items: mockItems,
        subtotal: subtotal,
        shipping: 5.99,
        tax: tax,
        total: total,
      });
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/payment/methods");
      if (response.ok) {
        const data = await response.json();
        setPaymentMethods(data);
      }
    } catch (err) {
      // Mock payment methods
      setPaymentMethods([
        { id: "stripe", name: "Credit/Debit Card", icon: "💳" },
        { id: "paypal", name: "PayPal", icon: "🔵" },
        { id: "google-pay", name: "Google Pay", icon: "🎯" },
        { id: "apple-pay", name: "Apple Pay", icon: "🍎" },
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setPaymentData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setPaymentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!paymentData.email) newErrors.email = "Email is required";
    if (!paymentData.cardNumber)
      newErrors.cardNumber = "Card number is required";
    if (!paymentData.expiryDate)
      newErrors.expiryDate = "Expiry date is required";
    if (!paymentData.cvv) newErrors.cvv = "CVV is required";
    if (!paymentData.cardholderName)
      newErrors.cardholderName = "Cardholder name is required";
    if (!paymentData.billingAddress.street)
      newErrors["billingAddress.street"] = "Address is required";
    if (!paymentData.billingAddress.city)
      newErrors["billingAddress.city"] = "City is required";
    if (!paymentData.billingAddress.postalCode)
      newErrors["billingAddress.postalCode"] = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setProcessing(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/payment/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...paymentData,
            orderSummary,
          }),
        }
      );

      if (response.ok) {
        alert("Payment successful! 🎉");
        // Redirect to success page
      } else {
        throw new Error("Payment failed");
      }
    } catch (err) {
      // Mock success for demo
      setTimeout(() => {
        alert(
          "Payment successful! 🎉\n(This is a demo - no real payment was processed)"
        );
        setProcessing(false);
      }, 2000);
    }
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <h1>💳 Secure Checkout</h1>
        <div className="security-badges">
          <span className="security-badge">🔒 SSL Secured</span>
          <span className="security-badge">🛡️ 256-bit Encryption</span>
        </div>
      </header>

      <div className="payment-content">
        <div className="payment-form-section">
          <div className="payment-methods">
            <h3>Choose Payment Method</h3>
            <div className="payment-options">
              {paymentMethods.map((method) => (
                <div key={method.id} className="payment-option">
                  <span className="payment-icon">{method.icon}</span>
                  <span className="payment-name">{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={paymentData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    className={errors.cardNumber ? "error" : ""}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  {errors.cardNumber && (
                    <span className="error-text">{errors.cardNumber}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    className={errors.expiryDate ? "error" : ""}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expiryDate && (
                    <span className="error-text">{errors.expiryDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    className={errors.cvv ? "error" : ""}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && (
                    <span className="error-text">{errors.cvv}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={handleInputChange}
                  className={errors.cardholderName ? "error" : ""}
                  placeholder="John Doe"
                />
                {errors.cardholderName && (
                  <span className="error-text">{errors.cardholderName}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Billing Address</h3>
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="billingAddress.street"
                  value={paymentData.billingAddress.street}
                  onChange={handleInputChange}
                  className={errors["billingAddress.street"] ? "error" : ""}
                  placeholder="123 Main Street"
                />
                {errors["billingAddress.street"] && (
                  <span className="error-text">
                    {errors["billingAddress.street"]}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="billingAddress.city"
                    value={paymentData.billingAddress.city}
                    onChange={handleInputChange}
                    className={errors["billingAddress.city"] ? "error" : ""}
                    placeholder="London"
                  />
                  {errors["billingAddress.city"] && (
                    <span className="error-text">
                      {errors["billingAddress.city"]}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="billingAddress.postalCode"
                    value={paymentData.billingAddress.postalCode}
                    onChange={handleInputChange}
                    className={
                      errors["billingAddress.postalCode"] ? "error" : ""
                    }
                    placeholder="SW1A 1AA"
                  />
                  {errors["billingAddress.postalCode"] && (
                    <span className="error-text">
                      {errors["billingAddress.postalCode"]}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className="pay-button" disabled={processing}>
              {processing ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                <>🔒 Pay £{orderSummary.total?.toFixed(2)}</>
              )}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {orderSummary.items.map((item, index) => (
                <div key={index} className="summary-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">× {item.quantity}</span>
                  <span className="item-price">
                    £{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-line">
                <span>Subtotal</span>
                <span>£{orderSummary.subtotal?.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Shipping</span>
                <span>£{orderSummary.shipping?.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>VAT (20%)</span>
                <span>£{orderSummary.tax?.toFixed(2)}</span>
              </div>
              <div className="total-line final-total">
                <span>Total</span>
                <span>£{orderSummary.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
