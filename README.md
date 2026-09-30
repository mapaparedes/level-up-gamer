# Level Up Gamer

Tienda gamer académica construida con React, React Router y Vite. Incluye una página de detalle de producto, productos relacionados y un carrito persistido en `localStorage`.

## Desarrollo

```sh
npm install
npm run dev
```

La ruta inicial lleva al detalle de ejemplo en `/productos/1`. El catálogo de muestra está en `src/services/productService.js`; se puede reemplazar por llamadas a una API sin modificar la vista. El carrito se gestiona desde `src/services/cartService.js`.

Para generar la versión de producción:

```sh
npm run build
```
