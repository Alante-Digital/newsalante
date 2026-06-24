import Link from "next/link";
import { CATEGORIES, type Category } from "@/lib/constants";
import { buildListPath, type ListFilters } from "@/lib/filters";

const linkBase =
  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition";

function categoryLinkClass(active: boolean) {
  return active
    ? `${linkBase} bg-alante-500 text-white`
    : `${linkBase} text-muted hover:bg-background hover:text-foreground`;
}

export function CategoryFilter({ filters }: { filters: ListFilters }) {
  const { category: activeCategory, year, month } = filters;
  const categories = Object.entries(CATEGORIES) as [Category, (typeof CATEGORIES)[Category]][];

  return (
    <nav className="flex flex-col gap-0.5">
      <Link href={buildListPath({ year, month })} className={categoryLinkClass(!activeCategory)}>
        Todas
      </Link>
      {categories.map(([key, { label, color }]) => (
        <Link
          key={key}
          href={buildListPath({ category: key, year, month })}
          className={categoryLinkClass(activeCategory === key)}
        >
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${activeCategory === key ? "bg-white/80" : color}`}
          />
          {label}
        </Link>
      ))}
    </nav>
  );
}
