export const SITE = {
  name: "Novedades",
  brand: "Alante Digital",
  description:
    "Todo lo último sobre nuestra plataforma: nuevas funcionalidades, mejoras y correcciones.",
  url: "https://novedades.alantedigital.com",
  appUrl: "https://alantedigital.com",
  demoUrl: "https://alantedigital.com/prueba-gratis",
  locale: "es-DO",
} as const;

export const CATEGORIES = {
  ventas: { label: "Ventas", color: "bg-sky-500" },
  "punto-de-venta": { label: "Punto de Venta", color: "bg-cyan-500" },
  "compras-y-gastos": { label: "Compras y Gastos", color: "bg-orange-500" },
  inventario: { label: "Inventario", color: "bg-amber-500" },
  "cajas-y-bancos": { label: "Cajas y Bancos", color: "bg-emerald-500" },
  contabilidad: { label: "Contabilidad", color: "bg-blue-500" },
  fiscal: { label: "Fiscal", color: "bg-indigo-500" },
  proyectos: { label: "Proyectos", color: "bg-violet-500" },
  "recursos-humanos": { label: "Recursos Humanos", color: "bg-rose-500" },
  crm: { label: "CRM", color: "bg-purple-500" },
  restaurantes: { label: "Restaurantes", color: "bg-lime-600" },
  soporte: { label: "Soporte", color: "bg-slate-500" },
} as const;

export type Category = keyof typeof CATEGORIES;

export const BADGES = {
  nuevo: {
    label: "Nuevo",
    className: "bg-alante-500 text-white",
  },
  mejora: {
    label: "Mejora",
    className: "bg-accent-blue text-white",
  },
  correccion: {
    label: "Corrección",
    className: "bg-slate-500 text-white",
  },
} as const;

export type Badge = keyof typeof BADGES;
