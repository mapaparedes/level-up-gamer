import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import { getCartCount } from "./services/cartService.js";

function CartCount() {
  const [count, setCount] = useState(getCartCount);

  useEffect(() => {
    const updateCount = () => setCount(getCartCount());
    window.addEventListener("cartchange", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("cartchange", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return <span className="cart-count" aria-label={`${count} unidades en el carrito`}>{count}</span>;
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="wordmark" to="/productos/1" aria-label="Level Up Gamer, inicio">
          <span className="wordmark-mark">LU<span>+</span></span>
          <span>LEVEL UP <b>GAMER</b></span>
        </Link>
        <nav className="main-nav" aria-label="Navegación principal">
          <Link to="/productos/1">Tienda</Link>
          <a href="#relacionados">Marcas</a>
        </nav>
        <div className="header-cart" aria-label="Carrito de compras">
          <span className="cart-label">MI CARRITO</span>
          <CartCount />
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/productos/1" replace />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="*" element={<Navigate to="/productos/1" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>LEVEL UP GAMER</span>
        <span>JUEGA A TU MANERA. JUEGA MEJOR.</span>
      </footer>
    </div>
  );
}