import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {SITE.brand}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <a href={SITE.appUrl} className="transition hover:text-alante-600" target="_blank" rel="noopener noreferrer">
            alantedigital.com
          </a>
          <a href={SITE.demoUrl} className="transition hover:text-alante-600" target="_blank" rel="noopener noreferrer">
            Prueba gratis
          </a>
          <a href="/rss.xml" className="transition hover:text-alante-600">
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
