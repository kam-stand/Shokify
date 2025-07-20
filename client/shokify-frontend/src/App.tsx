import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/products";
import CartPage from "./pages/cart";
import PaymentPage from "./pages/payment";
import AuthPage from "./pages/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
