export function PocketChange({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <aside className="mt-10 rounded-xl border border-border bg-background p-6">
      <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
        También en esta actualización
      </h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
            <span className="font-bold text-alante-500" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
