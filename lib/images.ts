export const DEFAULT_UPDATE_IMAGE = "/updates/placeholder.svg";

/** Devuelve la imagen del artículo o un placeholder si falta o está vacía */
export function getUpdateImageSrc(image?: string): string {
  const trimmed = image?.trim();
  return trimmed ? trimmed : DEFAULT_UPDATE_IMAGE;
}

export function hasCustomImage(image?: string): boolean {
  return Boolean(image?.trim());
}
