import React, { useState, useEffect } from "react";
import "../styles.css/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Try to fetch from backend first
      const response = await fetch("http://localhost:8080/api/products");

      if (!response.ok) {
        // If backend fails, use local products.json
        const localResponse = await fetch("/products.json");
        const data = await localResponse.json();
        setProducts(
          data.filter((product: any) => product.name && product.price)
        );
      } else {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      // Fallback to local data
      try {
        const localResponse = await fetch("/products.json");
        const data = await localResponse.json();
        setProducts(
          data.filter((product: any) => product.name && product.price)
        );
      } catch (localErr) {
        setError("Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getRandomEmoji = (id) => {
    const index = parseInt(id) % productEmojis.length;
    return productEmojis[index];
  };

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return price.includes("£") ? price : `£${price}`;
    }
    return `£${price}`;
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      <header className="products-header">
        <h1>🛍️ Product Catalog</h1>
        <div className="cart-info">
          Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} items
        </div>
      </header>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-emoji">{getRandomEmoji(product.id)}</div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <div className="product-details">
                <span className="product-price">
                  {formatPrice(product.price)}
                </span>
                <span className="product-color">{product.color}</span>
              </div>
              <p className="product-sizes">Sizes: {product.size}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          <p>No products available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
