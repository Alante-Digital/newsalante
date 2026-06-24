import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdatesIndexPage } from "@/components/UpdatesIndexPage";
import { formatMonthLabel, parseMonthParams } from "@/lib/filters";
import { getAvailableMonths } from "@/lib/updates";

interface PageProps {
  params: Promise<{ year: string; month: string }>;
}

export async function generateStaticParams() {
  return getAvailableMonths().map(({ year, month }) => ({
    year: String(year),
    month: String(month).padStart(2, "0"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month } = await params;
  const parsed = parseMonthParams(year, month);
  if (!parsed) return {};

  return {
    title: `Novedades de ${formatMonthLabel(parsed.year, parsed.month)}`,
    description: `Actualizaciones de Alante Digital publicadas en ${formatMonthLabel(parsed.year, parsed.month)}.`,
  };
}

export default async function MonthPage({ params }: PageProps) {
  const { year, month } = await params;
  const parsed = parseMonthParams(year, month);
  if (!parsed) notFound();

  const filters = { year: parsed.year, month: parsed.month };

  return <UpdatesIndexPage filters={filters} page={1} />;
}
