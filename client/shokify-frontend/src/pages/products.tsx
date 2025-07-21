import React, { useState, useEffect } from "react";
import "../styles.css/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Try to fetch from backend first
      const response = await fetch("http://localhost:8080/api/v1/products");

      if (!response.ok) {
        // If backend fails, use local products.json
        const localResponse = await fetch("/products.json");
        const data = await localResponse.json();
        const validProducts = data.filter(
          (product) => product.name && product.price
        );
        setProducts(validProducts);
        extractCategories(validProducts);
      } else {
        const data = await response.json();
        setProducts(data);
        extractCategories(data);
      }
    } catch (err) {
      // Fallback to local data
      try {
        const localResponse = await fetch("/products.json");
        const data = await localResponse.json();
        const validProducts = data.filter(
          (product) => product.name && product.price
        );
        setProducts(validProducts);
        extractCategories(validProducts);
      } catch (localErr) {
        setError("Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  };

  const extractCategories = (productList) => {
    const uniqueCategories = [
      ...new Set(
        productList.map((product) =>
          product.category
            ? product.category.split(" ").slice(0, 2).join(" ")
            : "Uncategorized"
        )
      ),
    ];
    setCategories(["All", ...uniqueCategories]);
  };

  const filterProducts = () => {
    if (selectedCategory === "all" || selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category &&
          product.category
            .toLowerCase()
            .includes(selectedCategory.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.toLowerCase());
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

  const extractProductDetails = (product) => {
    const details = [];

    // Extract brand from description if available
    if (product.description) {
      try {
        const descArray = JSON.parse(product.description);
        const brandInfo = descArray.find((item) => item.Brand);
        if (brandInfo) {
          const brand = brandInfo.Brand.split(" ")[0];
          details.push(`Brand: ${brand}`);
        }
      } catch (e) {
        // If description parsing fails, extract from name
        const nameParts = product.name.split(" ");
        if (nameParts.length > 0) {
          details.push(`Brand: ${nameParts[0]}`);
        }
      }
    }

    // Add material info if available
    if (product.description) {
      try {
        const descArray = JSON.parse(product.description);
        const aboutMe = descArray.find((item) => item["About Me"]);
        if (aboutMe) {
          const material = aboutMe["About Me"].split(",")[0];
          details.push(`Material: ${material}`);
        }
      } catch (e) {
        details.push("Material: Premium fabric");
      }
    }

    // Add style info
    if (product.name.toLowerCase().includes("coat")) {
      details.push("Style: Outerwear");
    } else if (product.name.toLowerCase().includes("jacket")) {
      details.push("Style: Casual");
    } else {
      details.push("Style: Classic");
    }

    return details.slice(0, 3); // Limit to 3 details
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      <header className="products-header">
        <h1>🛍️ Product Catalog</h1>
        <div className="header-controls">
          <div className="cart-info">
            Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} items
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="category-filter">
        <h3>Filter by Category</h3>
        <div className="category-buttons">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${
                selectedCategory === category.toLowerCase() ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="results-count">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-emoji">{getRandomEmoji(product.id)}</div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>

              {/* Product Details Section */}
              <div className="product-details-section">
                {extractProductDetails(product).map((detail, index) => (
                  <span key={index} className="product-detail-item">
                    {detail}
                  </span>
                ))}
              </div>

              <p className="product-category">{product.category}</p>
              <div className="product-pricing">
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

      {filteredProducts.length === 0 && !loading && (
        <div className="no-products">
          <p>No products found in this category.</p>
          <button
            className="reset-filter-btn"
            onClick={() => handleCategoryChange("All")}
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
