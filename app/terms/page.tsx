const CLAUSES = [
  {
    title: "1. Acceptance",
    body: "By using the directory you agree to these terms. Studios are responsible for the accuracy of their profiles and clients remain responsible for final engagement decisions."
  },
  {
    title: "2. Studio obligations",
    body: "Keep profile information up to date, respond to directory enquiries within five business days, and maintain suitable insurance for engagements derived from the platform."
  },
  {
    title: "3. Liability",
    body: "Atelier Designs curates introductions but does not enter the client-studio contract. We are not liable for project scope, fees, or delivery."
  }
];

export default function TermsPage() {
  return (
    <main className="bg-white pb-24 pt-20 text-black">
      <article className="mx-auto max-w-4xl px-6">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/75">Terms</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Terms of service.</h1>
        <p className="mt-4 text-base text-black/70 md:text-lg">
          These terms apply to studios, independents, and clients engaging with the platform. Updated July 2025.
        </p>
        <section className="mt-10 space-y-6 text-sm text-black/70 md:text-base">
          {CLAUSES.map((clause) => (
            <div key={clause.title}>
              <h2 className="text-xl font-semibold text-black">{clause.title}</h2>
              <p className="mt-2">{clause.body}</p>
            </div>
          ))}
        </section>
        <p className="mt-10 text-sm text-black/75">
          Questions? Contact <a href="mailto:legal@atelierdesigns.com" className="underline">legal@atelierdesigns.com</a>.
        </p>
      </article>
    </main>
  );
}
