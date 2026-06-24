import Link from "next/link";
import { CATEGORIES, type Category } from "@/lib/constants";

export function CategoryPill({
  category,
  linked = false,
}: {
  category: Category;
  linked?: boolean;
}) {
  const config = CATEGORIES[category];
  const className =
    "inline-flex items-center gap-1.5 rounded-md bg-background px-2 py-0.5 text-[11px] font-semibold tracking-wide text-muted uppercase";

  if (linked) {
    return (
      <Link href={`/categoria/${category}`} className={`${className} transition hover:text-foreground`}>
        <span className={`h-1.5 w-1.5 rounded-full ${config.color}`} />
        {config.label}
      </Link>
    );
  }

  return (
    <span className={className}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.color}`} />
      {config.label}
    </span>
  );
}
