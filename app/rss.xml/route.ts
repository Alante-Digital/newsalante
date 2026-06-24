import { SITE } from "@/lib/constants";
import { getAllUpdates } from "@/lib/updates";

export function GET() {
  const updates = getAllUpdates();

  const items = updates
    .map((update) => {
      const url = `${SITE.url}/novedades/${update.slug}`;
      return `
    <item>
      <title><![CDATA[${update.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(update.date).toUTCString()}</pubDate>
      <description><![CDATA[${update.excerpt}]]></description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>es</language>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
