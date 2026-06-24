import Image from "next/image";

export function UpdateImage({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`aspect-[16/9] w-full overflow-hidden bg-image-bg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="h-full w-full object-contain"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1200px"
      />
    </div>
  );
}
