import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@/components/ThemeScript";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `Novedades | ${SITE.brand}`,
    template: `%s | ${SITE.brand}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `Novedades | ${SITE.brand}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.brand,
    locale: SITE.locale,
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE.url}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full scroll-smooth antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
