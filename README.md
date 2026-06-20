# FakeStore E-Commerce - React + TypeScript

Este es el proyecto correspondiente al Trabajo Final Integrador (TFI) para el desarrollo de un Frontend interactivo que consume datos en tiempo real de la API pública [Fake Store API](https://fakestoreapi.com/).

La aplicación ha sido desarrollada utilizando **React + TypeScript + Vite** y **CSS Puro (Vanilla CSS)** para la maquetación y diseño visual premium, cumpliendo y superando todos los requerimientos funcionales y técnicos.

---

## 🚀 Características Clave & Extras Implementados

1. **Visualización de Productos**:
   - Diseño en grilla responsive adaptable a múltiples tamaños de pantalla (Mobile, Tablet y Desktop).
   - Tarjetas de producto que exhiben la imagen del producto, categoría, título, estrellas de valoración, cantidad de reseñas y precio.
   
2. **Filtro por Categorías Dinámico**:
   - Consumo del endpoint `/products/categories`.
   - Menú horizontal de botones tipo "pills/chips" con traducción de las categorías al español para una mejor experiencia de usuario.
   - Filtrado fluido sin recargar la página.

3. **Buscador de Productos (Extra)**:
   - Barra de búsqueda interactiva en tiempo real integrada en el encabezado.
   - Permite filtrar simultáneamente por término de búsqueda y categoría activa.

4. **Detalle de Producto (Modal)**:
   - Panel de detalles que se abre al hacer clic en la tarjeta del producto (intercepción en el botón de agregar para evitar disparos no deseados).
   - Muestra imagen en alta resolución, descripción completa, categoría, valoración y precio del producto.
   - Cierre interactivo mediante clic fuera del modal, botón de cerrar y la tecla **Escape**.

5. **Carrito de Compras Simulado**:
   - Barra lateral deslizable (Drawer) desde la derecha que muestra los productos añadidos.
   - Ajuste de cantidad por ítem, eliminación de productos y vaciado completo del carrito.
   - Cálculo en tiempo real de Subtotal, Costo de envío (con regla de envío gratis para compras superiores a $150.00) y Total.
   - Persistencia del carrito en **localStorage** para evitar pérdida de datos al recargar.
   - Simulación de compra con mensaje de éxito de checkout.

6. **Diseño Visual & Tema Oscuro/Claro (Extra)**:
   - Diseño estético moderno con tipografías de Google Fonts (`Outfit` y `Plus Jakarta Sans`).
   - Efectos de Glassmorphism (paneles y header translúcidos).
   - Transiciones y micro-animaciones en botones, tarjetas y menúes.
   - Alternador de modo oscuro/claro persistente en el dispositivo del usuario (`localStorage` y detección de preferencias del sistema).

7. **Estados de Carga y Errores (Extra)**:
   - Visualización de tarjetas esqueleto pulsantes (**Skeleton Loading UI**) durante el consumo inicial de la API.
   - Manejo de excepciones y errores (en caso de fallas de red o API caída) con botón de **Reintentar** incorporado en el dashboard.

8. **Paginación Dinámica (Extra)**:
   - Paginación del lado del cliente configurada a **8 productos por página (4 columnas x 2 filas)**.
   - Los controles de paginación se adaptan según el número de productos resultantes de los filtros.

---

## 🛠️ Tecnologías y Librerías

- **Framework**: React 18+ (con TypeScript)
- **Bundler**: Vite
- **Estilos**: Vanilla CSS con variables CSS customizables
- **Iconografía**: [Lucide-React](https://lucide.dev/)

---

## 📂 Estructura del Proyecto

```
ProyectoFinal+React+TS/
├── public/                 # Recursos estáticos
├── src/
│   ├── components/         # Componentes modulares
│   │   ├── CartDrawer.tsx         # Sidebar de compras
│   │   ├── CategoryChips.tsx     # Filtros de categorías
│   │   ├── Header.tsx            # Navegación, búsqueda y temas
│   │   ├── Loader.tsx            # Spinner de carga global
│   │   ├── Pagination.tsx        # Navegación de páginas
│   │   ├── ProductCard.tsx       # Tarjeta individual de producto
│   │   ├── ProductDetailModal.tsx# Modal de detalles
│   │   └── SkeletonCard.tsx      # Marcador de carga animado
│   ├── types/              # Interfaces TypeScript
│   │   └── index.ts
│   ├── App.css             # Sobrescrituras
│   ├── App.tsx             # Estado principal y coordinación
│   ├── index.css           # Sistema de diseño, variables y keyframes
│   └── main.tsx            # Punto de montaje de React
├── index.html              # Plantilla HTML con SEO optimizado
├── package.json            # Scripts y dependencias
└── tsconfig.json           # Configuración de TypeScript
```

---

## ⚙️ Instrucciones de Ejecución

Para levantar el proyecto de forma local, asegúrate de tener instalado [Node.js](https://nodejs.org/).

### 1. Clonar o acceder a la carpeta del proyecto
Ingresa al directorio del proyecto:
```bash
cd ProyectoFinal+React+TS
```

### 2. Instalar dependencias
Instala los paquetes necesarios definidos en el `package.json`:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
Ejecuta el servidor de desarrollo local:
```bash
npm run dev
```

El terminal te proporcionará una URL (normalmente `http://localhost:5173`). Ábrela en tu navegador para interactuar con la aplicación.

### 4. Construir para producción (opcional)
Si deseas compilar la aplicación para producción:
```bash
npm run build
```
Los archivos de salida listos para desplegar se generarán en la carpeta `dist`.
