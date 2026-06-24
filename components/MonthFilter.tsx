import Link from "next/link";
import { buildListPath, formatMonthLabel, type ListFilters } from "@/lib/filters";
import { getAvailableMonths } from "@/lib/updates";

const linkBase =
  "block rounded-lg px-3 py-2 text-sm font-medium transition";

function monthLinkClass(active: boolean) {
  return active
    ? `${linkBase} bg-alante-500 text-white`
    : `${linkBase} text-muted hover:bg-surface hover:text-foreground`;
}

export function MonthFilter({ filters }: { filters: ListFilters }) {
  const { category, year: activeYear, month: activeMonth } = filters;
  const months = getAvailableMonths();
  const isAllMonths = !activeYear || !activeMonth;

  return (
    <nav className="flex flex-col gap-0.5">
      <Link href={buildListPath({ category })} className={monthLinkClass(isAllMonths)}>
        Todos los meses
      </Link>
      {months.map(({ year, month }) => {
        const isActive = activeYear === year && activeMonth === month;
        return (
          <Link
            key={`${year}-${month}`}
            href={buildListPath({ category, year, month })}
            className={monthLinkClass(isActive)}
          >
            {formatMonthLabel(year, month)}
          </Link>
        );
      })}
    </nav>
  );
}
