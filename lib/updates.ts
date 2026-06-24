import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Badge, Category } from "./constants";
import type { ListFilters } from "./filters";

const UPDATES_DIR = path.join(process.cwd(), "content/updates");

export interface UpdateFrontmatter {
  title: string;
  date: string;
  author: string;
  category: Category;
  badge: Badge;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  pocketChange?: string[];
}

export interface UpdateMeta extends UpdateFrontmatter {
  slug: string;
  readingMinutes: number;
}

export interface Update extends UpdateMeta {
  content: string;
}

function parseFile(filename: string): Update {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(UPDATES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as UpdateFrontmatter;

  return {
    slug,
    ...frontmatter,
    content,
    readingMinutes: Math.ceil(readingTime(content).minutes),
  };
}

export function getAllUpdates(): UpdateMeta[] {
  if (!fs.existsSync(UPDATES_DIR)) return [];

  return fs
    .readdirSync(UPDATES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const update = parseFile(file);
      const { content: _, ...meta } = update;
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllUpdatesWithContent(): Update[] {
  if (!fs.existsSync(UPDATES_DIR)) return [];

  return fs
    .readdirSync(UPDATES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseFile(file))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getUpdateBySlug(slug: string): Update | null {
  const filePath = path.join(UPDATES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseFile(`${slug}.mdx`);
}

export function getUpdatesByCategory(category: Category): UpdateMeta[] {
  return getAllUpdates().filter((update) => update.category === category);
}

export interface MonthPeriod {
  year: number;
  month: number;
  key: string;
}

export function getAvailableMonths(): MonthPeriod[] {
  const keys = new Set<string>();

  for (const update of getAllUpdates()) {
    const date = new Date(update.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    keys.add(`${year}-${String(month).padStart(2, "0")}`);
  }

  return Array.from(keys)
    .map((key) => {
      const [year, month] = key.split("-").map(Number);
      return { year, month, key };
    })
    .sort((a, b) => b.year - a.year || b.month - a.month);
}

export function getFilteredUpdates(filters: ListFilters): UpdateMeta[] {
  let updates = getAllUpdates();

  if (filters.category) {
    updates = updates.filter((update) => update.category === filters.category);
  }

  if (filters.year && filters.month) {
    updates = updates.filter((update) => {
      const date = new Date(update.date);
      return (
        date.getFullYear() === filters.year && date.getMonth() + 1 === filters.month
      );
    });
  }

  return updates;
}

export function getUpdatesByCategoryWithContent(category: Category): Update[] {
  return getAllUpdatesWithContent().filter((update) => update.category === category);
}

export function getAllSlugs(): string[] {
  return getAllUpdates().map((update) => update.slug);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-DO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatShortDate(date: string): string {
  return new Intl.DateTimeFormat("es-DO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatTimelineDate(date: string): string {
  return new Intl.DateTimeFormat("es-DO", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
