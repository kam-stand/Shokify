import React, { useState, useEffect } from "react";
import "../styles.css/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");

  // Random emojis for products
  const productEmojis = [
    "👕",
    "👔",
    "🧥",
    "👗",
    "👚",
    "👖",
    "🧤",
    "👒",
    "👜",
    "👠",
    "🥾",
    "👟",
  ];

  useEffect(() => {
    fetchCartItems();
    fetchOrders();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/cart");
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (err) {
      // Mock cart data for demo
      setCartItems([
        {
          id: 1,
          name: "New Look trench coat in camel",
          price: "49.99",
          quantity: 2,
          color: "Neutral",
        },
        {
          id: 2,
          name: "Stradivarius double breasted wool coat",
          price: "59.99",
          quantity: 1,
          color: "Grey",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      // Mock orders data for demo
      setOrders([
        {
          id: "ORDER-001",
          date: "2025-01-10",
          status: "Delivered",
          total: "129.98",
          items: [
            {
              id: 1,
              name: "Nike Running hooded jacket",
              price: "84.95",
              quantity: 1,
            },
            {
              id: 2,
              name: "ASOS DESIGN denim bomber",
              price: "45.03",
              quantity: 1,
            },
          ],
        },
        {
          id: "ORDER-002",
          date: "2025-01-08",
          status: "Processing",
          total: "199.97",
          items: [
            {
              id: 3,
              name: "Carhartt WIP michigan jacket",
              price: "150.00",
              quantity: 1,
            },
            {
              id: 4,
              name: "Columbia Puffect jacket",
              price: "49.97",
              quantity: 1,
            },
          ],
        },
      ]);
    }
  };

  const getRandomEmoji = (id) => {
    const index = parseInt(id) % productEmojis.length;
    return productEmojis[index];
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.toString().replace(/[£$]/, ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const proceedToCheckout = () => {
    alert("Proceeding to checkout...");
    // Navigate to payment page
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "#27ae60";
      case "processing":
        return "#f39c12";
      case "shipped":
        return "#3498db";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>🛒 Shopping & Orders</h1>
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === "cart" ? "active" : ""}`}
            onClick={() => setActiveTab("cart")}
          >
            Cart ({cartItems.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders ({orders.length})
          </button>
        </div>
      </header>

      {activeTab === "cart" && (
        <div className="cart-section">
          {loading ? (
            <div className="loading">Loading cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>🛒 Your cart is empty</p>
              <button className="continue-shopping">Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-emoji">{getRandomEmoji(item.id)}</div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-color">Color: {item.color}</p>
                      <div className="item-price">£{item.price}</div>
                    </div>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="item-total">
                      £
                      {(
                        parseFloat(item.price.toString().replace(/[£$]/, "")) *
                        item.quantity
                      ).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="total-section">
                  <h3>Total: £{getTotalPrice()}</h3>
                  <button className="checkout-btn" onClick={proceedToCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div className="orders-section">
          {orders.length === 0 ? (
            <div className="no-orders">
              <p>📦 No orders found</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Order #{order.id}</h3>
                      <p className="order-date">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="order-status">
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusColor(order.status),
                        }}
                      >
                        {order.status}
                      </span>
                      <div className="order-total">£{order.total}</div>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <span className="item-emoji">
                          {getRandomEmoji(item.id)}
                        </span>
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-details">
                            Qty: {item.quantity} × £{item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
