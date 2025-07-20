import React, { useState } from "react";
import "../styles.css/auth.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e:any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isLogin ? "/user/login" : "/user/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // On success, redirect to /products
      window.location.href = "/products";

    } catch (err) {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="toggle-link"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setFormData({ name: "", email: "", password: "", role: "user" });
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
