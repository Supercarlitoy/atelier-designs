const OPEN_ROLES = [
  {
    title: "Partnerships Lead",
    type: "Full-time",
    location: "Hybrid · Melbourne",
    summary:
      "Shape studio relationships, onboard new partners, and run quarterly showcase programming.",
    responsibilities: [
      "Own outreach and due diligence for prospective studios and independents.",
      "Coordinate reference checks, profile onboarding, and quality reviews.",
      "Lead sponsor and event partnerships tied to the Melbourne design calendar."
    ]
  },
  {
    title: "Content Editor",
    type: "Part-time",
    location: "Remote · AEST",
    summary: "Craft case studies, interviews, and newsletter content spotlighting our community.",
    responsibilities: [
      "Interview studio founders and clients to surface outcomes and insights.",
      "Own the editorial calendar across web, newsletter, and social snippets.",
      "Collaborate with photographers and videographers to capture work in situ."
    ]
  }
];

export default function CareersPage() {
  return (
    <main className="bg-[#f8f8f8] pb-24 pt-20 text-black">
      <section className="mx-auto max-w-5xl px-6">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/40">Careers</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Join the team curating Melbourne’s design talent.</h1>
        <p className="mt-4 max-w-3xl text-base text-black/70 md:text-lg">
          We are a lean team of producers, strategists, and technologists. We work remotely-first with regular Melbourne meetups, and we consciously partner with underrepresented voices in design.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-6 space-y-6">
        {OPEN_ROLES.map((role) => (
          <article key={role.title} className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_18px_40px_rgba(15,18,24,0.08)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold">{role.title}</h2>
              <p className="text-xs uppercase tracking-[0.3rem] text-black/50">
                {role.type} · {role.location}
              </p>
            </div>
            <p className="mt-3 text-sm text-black/70">{role.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              {role.responsibilities.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <a
              href="mailto:talent@atelierdesigns.com?subject=Role%20application"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
            >
              Apply via email
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
