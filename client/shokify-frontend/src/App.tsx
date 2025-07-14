import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/products";
import CartPage from "./pages/cart";
import PaymentPage from "./pages/payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
