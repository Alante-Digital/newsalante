import type { ReactNode } from "react";

export function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside
      className="callout my-8 rounded-xl border-2 border-alante-500 bg-alante-50 px-5 py-4 sm:px-6 sm:py-5"
      role="note"
    >
      <p className="callout-kicker">Importante</p>
      <p className="callout-title">{title}</p>
      <div className="callout-body">{children}</div>
    </aside>
  );
}
