import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../services/cartService.js";
import { getProductById, getRelatedProducts } from "../services/productService.js";

const currency = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [relacionados, setRelacionados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let vigente = true;
    setCargando(true);
    setError("");
    setProducto(null);
    setRelacionados([]);
    setCantidad(1);

    Promise.all([getProductById(id), getRelatedProducts(id)])
      .then(([productoData, relacionadosData]) => {
        if (!vigente) return;
        if (!productoData) {
          setError("No encontramos ese producto.");
          return;
        }
        setProducto(productoData);
        setRelacionados(relacionadosData);
      })
      .catch(() => {
        if (vigente) setError("No pudimos cargar el producto. Inténtalo de nuevo.");
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      window.alert("La cantidad debe ser al menos 1");
      return;
    }
    if (cantidad > producto.stock) {
      window.alert("No hay suficiente stock disponible");
      return;
    }
    addToCart(producto, cantidad);
    window.alert("Producto añadido al carrito");
  };

  if (cargando) return <p className="status-message">Cargando producto...</p>;
  if (error) {
    return (
      <section className="status-message error-state" role="alert">
        <p>{error}</p>
        <Link className="text-link" to="/productos/1">Volver a la tienda</Link>
      </section>
    );
  }

  const sinStock = producto.stock < 1;

  return (
    <div className="page-content">
      <div className="breadcrumbs"><Link to="/productos/1">Tienda</Link><span>/</span><span>{producto.category}</span></div>

      <section className="product-layout" aria-labelledby="product-title">
        <div className="product-visual">
          <span className="visual-index">PRODUCTO {String(producto.id).padStart(2, "0")}</span>
          <img src={producto.image} alt={producto.name} />
          <span className="visual-caption">DISEÑADO PARA GANAR</span>
        </div>

        <div className="product-info">
          <p className="eyebrow">{producto.brand} <span>/</span> {producto.category}</p>
          <h1 id="product-title">{producto.name}</h1>
          <div className="rating" aria-label={`Calificación ${producto.rating} de 5 estrellas`}>
            <span aria-hidden="true">★★★★★</span><b>{producto.rating}</b><span className="review-count">(opiniones de jugadores)</span>
          </div>
          <p className="product-description">{producto.description}</p>

          <div className="purchase-block">
            <div className="price-line">
              <span className="price">{currency.format(producto.price)}</span>
              <span className={`stock ${sinStock ? "stock-empty" : ""}`}>
                <i aria-hidden="true" />{sinStock ? "Sin stock" : `${producto.stock} disponibles`}
              </span>
            </div>
            <div className="purchase-controls">
              <label className="quantity-control">
                <span>CANT.</span>
                <input
                  type="number"
                  min="1"
                  max={producto.stock}
                  value={cantidad}
                  disabled={sinStock}
                  onChange={(event) => setCantidad(event.target.value === "" ? "" : Number(event.target.value))}
                  aria-label="Cantidad"
                />
              </label>
              <button className="add-button" type="button" onClick={handleAddToCart} disabled={sinStock}>
                <span>Añadir al carrito</span><span aria-hidden="true">↗</span>
              </button>
            </div>
            <p className="shipping-note"><span aria-hidden="true">＋</span> Envío seguro · Compra protegida</p>
          </div>
        </div>
      </section>

      <section className="related-section" id="relacionados" aria-labelledby="related-title">
        <div className="section-heading">
          <div><p className="eyebrow">SIGUE EXPLORANDO</p><h2 id="related-title">También te puede gustar<span>.</span></h2></div>
          <span className="section-count">0{relacionados.length} PRODUCTOS</span>
        </div>
        <div className="related-grid">
          {relacionados.map((rel, index) => (
            <Link key={rel.id} to={`/productos/${rel.id}`} className="related-product">
              <div className="related-image"><span>0{index + 1}</span><img src={rel.image} alt={rel.name} loading="lazy" /></div>
              <div className="related-copy"><div><p>{rel.brand}</p><h3>{rel.name}</h3></div><span className="related-arrow" aria-hidden="true">↗</span></div>
              <p className="related-price">{currency.format(rel.price)}</p>
            </Link>
          ))}
          {relacionados.length === 0 && <p className="empty-related">No hay productos relacionados por ahora.</p>}
        </div>
      </section>
    </div>
  );
}