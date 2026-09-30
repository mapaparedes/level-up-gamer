import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, getRelatedProducts } from "../services/productService";
import { addToCart } from "../services/cartService";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [relacionados, setRelacionados] = useState([]);

  useEffect(() => {
    getProductById(id).then(data => setProducto(data));
    getRelatedProducts(id).then(data => setRelacionados(data));
  }, [id]);

  const handleAddToCart = () => {
    if (cantidad < 1) {
      alert("La cantidad debe ser al menos 1");
      return;
    }
    if (cantidad > producto.stock) {
      alert("No hay suficiente stock disponible");
      return;
    }
    addToCart(producto, cantidad);
    alert("Producto añadido al carrito");
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle-producto">
      <h1>{producto.name}</h1>
      <img src={producto.image} alt={producto.name} />
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>
      <p>Stock disponible: {producto.stock}</p>

      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          max={producto.stock}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
      </div>

      <button onClick={handleAddToCart}>Añadir al carrito</button>

      <h2>Productos relacionados</h2>
      <div className="relacionados">
        {relacionados.map((rel) => (
          <div key={rel.id} className="producto-relacionado">
            <img src={rel.image} alt={rel.name} />
            <p>{rel.name}</p>
            <p>${rel.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetalleProducto;
