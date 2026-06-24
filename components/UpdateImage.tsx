import Image from "next/image";

export function UpdateImage({
  src,
  alt,
  priority = false,
  className = "",
  fill = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Rellena el contenedor padre (el padre debe ser `relative` con altura definida) */
  fill?: boolean;
}) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 600px"
      />
    );
  }

  return (
    <div className={`overflow-hidden bg-image-bg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="aspect-[16/9] w-full object-cover"
        priority={priority}
      />
    </div>
  );
}
