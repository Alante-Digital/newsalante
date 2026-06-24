export function AuthorAvatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-alante-100 text-sm font-semibold text-alante-700 dark:text-alante-200">
      {initial}
    </span>
  );
}
