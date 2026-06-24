# Novedades de Alante Digital

Sitio de changelog para publicar nuevas funcionalidades, mejoras y correcciones de [Alante Digital](https://alantedigital.com).

Producción: [novedades.alantedigital.com](https://novedades.alantedigital.com)  
Repositorio: [github.com/Alante-Digital/newsalante](https://github.com/Alante-Digital/newsalante)

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **MDX** — el contenido vive en archivos `.mdx`, sin base de datos

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Si el puerto 3000 está ocupado, Next.js usará el siguiente disponible (por ejemplo, 3001).

```bash
npm run build   # verificar que el sitio compila
npm run lint    # revisar el código
```

## Publicar una novedad

1. Crea un archivo `.mdx` en `content/updates/`.
2. Añade la imagen en `public/updates/` (recomendado: 1200×675 px, formato 16:9).
3. Haz commit y push — en producción, Vercel reconstruye el sitio automáticamente.

El nombre del archivo define la URL: `mi-novedad.mdx` → `/novedades/mi-novedad`

### Frontmatter

```mdx
---
title: "Título de la novedad"
date: "2026-06-23"
author: "Tu nombre"
category: ventas
badge: nuevo
excerpt: "Resumen corto que aparece en el listado."
image: "/updates/mi-captura.jpg"
imageAlt: "Descripción de la imagen para accesibilidad"
pocketChange:
  - "Cambio menor relacionado"
  - "Otro detalle"
---

Contenido en Markdown/MDX...
```

| Campo | Obligatorio | Descripción |
|---|---|---|
| `title` | Sí | Título del artículo |
| `date` | Sí | Fecha de publicación (`YYYY-MM-DD`) |
| `author` | Sí | Nombre del autor |
| `category` | Sí | Aplicación de Alante (ver tabla abajo) |
| `badge` | Sí | Tipo de novedad: `nuevo`, `mejora` o `correccion` |
| `excerpt` | Sí | Resumen para tarjetas y SEO |
| `image` | No | Ruta a la imagen en `public/updates/` |
| `imageAlt` | Recomendado | Texto alternativo de la imagen |
| `pocketChange` | No | Lista de cambios menores relacionados |

### Aplicaciones (`category`)

| Slug | Aplicación |
|---|---|
| `ventas` | Ventas |
| `punto-de-venta` | Punto de Venta |
| `compras-y-gastos` | Compras y Gastos |
| `inventario` | Inventario |
| `cajas-y-bancos` | Cajas y Bancos |
| `contabilidad` | Contabilidad |
| `fiscal` | Fiscal |
| `proyectos` | Proyectos |
| `recursos-humanos` | Recursos Humanos |
| `crm` | CRM |
| `restaurantes` | Restaurantes |
| `soporte` | Soporte |

### Badges (`badge`)

| Valor | Etiqueta | Cuándo usarlo |
|---|---|---|
| `nuevo` | Nuevo | Funcionalidad nueva |
| `mejora` | Mejora | Cambio en algo que ya existía |
| `correccion` | Corrección | Arreglo de un bug |

### Imágenes

- En el **listado**, si no hay `image` se muestra un placeholder para mantener las tarjetas alineadas.
- En la **página de detalle**, si no hay `image` no se muestra imagen hero.

## Rutas del sitio

| Ruta | Descripción |
|---|---|
| `/` | Listado principal (página 1) |
| `/pagina/2` | Paginación del listado |
| `/novedades/[slug]` | Artículo individual |
| `/categoria/[category]` | Filtrar por aplicación |
| `/mes/[year]/[month]` | Filtrar por mes (ej. `/mes/2026/06`) |
| `/categoria/[category]/mes/[year]/[month]` | Aplicación + mes combinados |
| `/rss.xml` | Feed RSS |

Los filtros de aplicación y mes se pueden combinar. Al cambiar de filtro, el otro filtro activo se conserva. Si una combinación no tiene artículos, la página se muestra con un mensaje vacío (no devuelve 404).

En móvil, los filtros aparecen colapsados por defecto en una barra compacta.

## Paginación

El listado muestra **12 artículos por página**. Ejemplos:

- `/pagina/2`
- `/categoria/ventas/pagina/2`
- `/categoria/cajas-y-bancos/mes/2026/06/pagina/2`

## Despliegue

1. Conecta el repositorio en [Vercel](https://vercel.com).
2. Cada push a `main` reconstruye el sitio.
3. En Vercel → **Settings → Domains**, añade `novedades.alantedigital.com`.
4. Configura el registro DNS (CNAME) que indique Vercel en tu proveedor de dominio.

## Estructura del proyecto

```
app/                  # Rutas Next.js
components/           # UI (filtros, tarjetas, paginación, etc.)
content/updates/      # Artículos MDX
lib/                  # Lógica (filtros, paginación, constantes)
public/updates/       # Imágenes de los artículos
public/img/           # Logo y assets del sitio
```
