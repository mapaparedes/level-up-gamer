const products = [
  {
    id: "1",
    name: "Auriculares Nova Pro Wireless",
    brand: "STEELSERIES",
    category: "AUDIO",
    description: "Escucha cada detalle antes que nadie. Audio de alta fidelidad, cancelación activa de ruido y una conexión inalámbrica pensada para sesiones sin interrupciones.",
    price: 289990,
    stock: 12,
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "2",
    name: "Teclado mecánico Apex TKL",
    brand: "HYPERX",
    category: "PERIFÉRICOS",
    description: "Respuesta rápida y precisa en un formato compacto. Switches mecánicos, iluminación personalizable y construcción sólida para cada partida.",
    price: 119990,
    stock: 8,
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "3",
    name: "Mouse inalámbrico Pulse X",
    brand: "LOGITECH G",
    category: "PERIFÉRICOS",
    description: "Ligero, veloz y preparado para seguir tus movimientos con precisión. Un diseño ergonómico para que cada clic cuente.",
    price: 79990,
    stock: 15,
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "4",
    name: "Monitor Odyssey 27 pulgadas",
    brand: "SAMSUNG",
    category: "MONITORES",
    description: "Más espacio para reaccionar y más detalle en pantalla. Panel de alta definición con una imagen fluida para competir y disfrutar.",
    price: 349990,
    stock: 5,
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85",
  },
];

export function getProductById(id) {
  return Promise.resolve(products.find((product) => product.id === String(id)) ?? null);
}

export function getRelatedProducts(id) {
  return Promise.resolve(products.filter((product) => product.id !== String(id)).slice(0, 3));
}