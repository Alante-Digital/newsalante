# Novedades de Alante Digital

Sitio de changelog para publicar nuevas funcionalidades, mejoras y correcciones de [Alante Digital](https://alantedigital.com).

Diseñado para desplegarse en `novedades.alantedigital.com`.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Publicar una novedad

Crea un archivo `.mdx` en `content/updates/` con este formato:

```mdx
---
title: "Título de la novedad"
date: "2026-06-23"
author: "Tu nombre"
category: facturacion
badge: nuevo
excerpt: "Resumen corto que aparece en el listado."
image: "/updates/mi-captura.jpg"   # obligatorio — sin imagen el card se desalinea
imageAlt: "Descripción de la imagen para accesibilidad"
pocketChange:
  - "Cambio menor relacionado"
  - "Otro detalle"
---

Contenido en Markdown/MDX...
```

### Categorías disponibles

`facturacion` · `tesoreria` · `inventario` · `crm` · `contabilidad` · `equipo` · `gastos` · `plataforma`

### Badges disponibles

`nuevo` · `mejora` · `correccion`

El nombre del archivo define la URL: `mi-novedad.mdx` → `/novedades/mi-novedad`

Guarda la imagen en `public/updates/` (recomendado: 1200×675 px, formato 16:9). Si omites `image`, se mostrará un placeholder genérico.

## Paginación

El listado muestra **12 artículos por página**. Con más de 12 novedades:

- Página 1: `/`
- Página 2+: `/pagina/2`, `/pagina/3`, …
- Por categoría: `/categoria/facturacion/pagina/2`

## Filtros

**Por módulo** y **por mes** se pueden combinar:

- Junio 2026: `/mes/2026/06`
- Facturación en junio 2026: `/categoria/facturacion/mes/2026/06`

Los filtros activos se conservan al cambiar de módulo o mes.

## Despliegue

Recomendado: [Vercel](https://vercel.com) conectado al repositorio Git. Cada push reconstruye el sitio automáticamente.

Configura el dominio `novedades.alantedigital.com` en tu proveedor DNS apuntando a Vercel.

## RSS

Feed disponible en `/rss.xml`.
