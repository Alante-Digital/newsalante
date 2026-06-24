import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/img/logo.png"
            alt="Alante Digital"
            width={140}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <a
            href="/rss.xml"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-background hover:text-foreground sm:inline-flex"
          >
            RSS
          </a>
          <a
            href={SITE.appUrl}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-background hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sitio web
          </a>
          <a
            href={SITE.demoUrl}
            className="rounded-lg bg-alante-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-alante-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prueba gratis
          </a>
        </nav>
      </div>
    </header>
  );
}
