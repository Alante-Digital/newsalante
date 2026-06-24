"use client";

import { useState } from "react";
import type { ListFilters } from "@/lib/filters";
import { getFilterSummary } from "@/lib/filters";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CollapsibleFilters({
  filters,
  children,
}: {
  filters: ListFilters;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const summary = getFilterSummary(filters);

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-3 p-4 text-left"
          aria-expanded={open}
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Filtros
            </p>
            <p className="truncate text-sm font-medium text-foreground">{summary}</p>
          </div>
          <ChevronIcon open={open} />
        </button>
        {open && (
          <div className="max-h-[min(60vh,28rem)] overflow-y-auto border-t border-border p-5">
            {children}
          </div>
        )}
      </div>

      <div className="hidden rounded-2xl bg-surface p-5 ring-1 ring-border lg:block lg:sticky lg:top-24">
        {children}
      </div>
    </>
  );
}
