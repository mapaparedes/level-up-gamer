const CART_KEY = "level-up-gamer-cart";

function readCart() {
  try {
    const cart = JSON.parse(window.localStorage.getItem(CART_KEY) ?? "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

export function addToCart(product, quantity) {
  const cart = readCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity });
  }

  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartchange"));
}

export function getCartCount() {
  return readCart().reduce((total, item) => total + item.quantity, 0);
}