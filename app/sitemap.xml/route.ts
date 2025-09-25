import caseStudies from "@/data/case-studies.seed.json";
import featuredDesigners from "@/data/featured-designers.seed.json";
import profiles from "@/data/profiles.seed.json";

const HOST = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atelierdesigns.com";

export function GET() {
  const staticRoutes = [
    "",
    "designers",
    "collections",
    "case-studies",
    "about",
    "careers",
    "press",
    "contact",
    "faq",
    "privacy",
    "terms"
  ];

  const urls: string[] = [
    ...staticRoutes.map((route) => `${HOST}/${route}`.replace(/\/$/, "")),
    ...caseStudies.map((study) => `${HOST}/case-studies/${study.slug}`),
    ...profiles.map((profile) => `${HOST}/profiles/${profile.slug}`),
    ...featuredDesigners.map((designer) => `${HOST}/profiles/${designer.slug}`)
  ];

  const uniqueUrls = Array.from(new Set(urls));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    uniqueUrls
      .map((url) => {
        return `  <url>\n    <loc>${url}</loc>\n  </url>`;
      })
      .join("\n") +
    "\n</urlset>";

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml"
    }
  });
}
