import { CategoryFilter } from "@/components/CategoryFilter";
import { CollapsibleFilters } from "@/components/CollapsibleFilters";
import { MonthFilter } from "@/components/MonthFilter";
import type { ListFilters } from "@/lib/filters";

export function FiltersSidebar({ filters }: { filters: ListFilters }) {
  return (
    <aside>
      <CollapsibleFilters filters={filters}>
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
            Aplicaciones
          </p>
          <CategoryFilter filters={filters} />
        </div>
        <div className="border-t border-border pt-6">
          <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
            Mes
          </p>
          <MonthFilter filters={filters} />
        </div>
      </CollapsibleFilters>
    </aside>
  );
}
