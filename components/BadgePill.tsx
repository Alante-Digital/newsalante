import { BADGES, type Badge } from "@/lib/constants";

export function BadgePill({ badge }: { badge: Badge }) {
  const config = BADGES[badge];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase ${config.className}`}
    >
      {config.label}
    </span>
  );
}
