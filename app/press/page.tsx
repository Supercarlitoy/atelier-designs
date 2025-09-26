const PRESS_KIT_ITEMS = [
  {
    title: "Media kit",
    description: "Logos, photography, and boilerplate copy for print or digital stories.",
    href: "https://drive.google.com",
    label: "Download"
  },
  {
    title: "Spokespeople",
    description: "Request interviews with our partnerships lead or design research team.",
    href: "mailto:press@atelierdesigns.com",
    label: "Request interview"
  }
];

const RECENT_FEATURES = [
  {
    outlet: "Design Quarterly",
    headline: "Melbourne directory sets new benchmark for curated marketplaces",
    date: "July 2025",
    href: "https://designquarterly.example"
  },
  {
    outlet: "The Creative Conversation",
    headline: "Building trust between clients and studios",
    date: "June 2025",
    href: "https://creativeconversation.example"
  }
];

export default function PressPage() {
  return (
    <main className="bg-white pb-24 pt-20 text-black">
      <section className="mx-auto max-w-4xl px-6">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/75">Press</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Resources for journalists and collaborators.</h1>
        <p className="mt-4 text-base text-black/70 md:text-lg">
          We’re happy to share data about the Melbourne design ecosystem, connect you with studio founders, or provide comment on industry trends. Explore the resources below or reach us directly at <a href="mailto:press@atelierdesigns.com" className="underline">press@atelierdesigns.com</a>.
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-4xl gap-6 px-6 md:grid-cols-2">
        {PRESS_KIT_ITEMS.map((item) => (
          <article key={item.title} className="rounded-3xl border border-black/10 bg-[#f8f8f8] p-6 shadow-[0_10px_24px_rgba(15,18,24,0.08)]">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-black/70">{item.description}</p>
            <a
              href={item.href}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.35rem] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f8f8]"
            >
              {item.label}
            </a>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-4xl px-6">
        <h2 className="text-2xl font-semibold">Recent coverage</h2>
        <ul className="mt-6 space-y-4 text-sm text-black/70">
          {RECENT_FEATURES.map((feature) => (
            <li key={feature.headline} className="rounded-3xl border border-black/10 bg-[#f8f8f8] p-6 shadow-[0_10px_24px_rgba(15,18,24,0.08)]">
              <p className="text-xs uppercase tracking-[0.3rem] text-black/70">{feature.outlet} · {feature.date}</p>
              <a href={feature.href} className="mt-2 block text-lg font-semibold text-black underline-offset-8 hover:underline">
                {feature.headline}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
