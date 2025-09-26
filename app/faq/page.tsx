const QUESTIONS = [
  {
    q: "How do you vet designers?",
    a: "We assess live work, run confidential reference calls, and look for evidence of transparent process. Only studios and independents with proven outcomes make it into the directory."
  },
  {
    q: "Can I request a custom shortlist?",
    a: "Yes. Share your brief through the lead form and we’ll match you with 3–5 studios based on craft, availability, and budget."
  },
  {
    q: "How often are profiles reviewed?",
    a: "Every six months. We check in on recent projects, collaboration feedback, and team changes."
  },
  {
    q: "Is there a cost to join?",
    a: "There’s no listing fee. We operate on a partnership model and selectively open paid placements for events and showcases."
  }
];

export default function FaqPage() {
  return (
    <main className="bg-white pb-24 pt-20 text-black">
      <section className="mx-auto max-w-4xl px-6">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/75">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Frequently asked questions.</h1>
        <p className="mt-4 text-base text-black/70 md:text-lg">
          If you can’t find the answer you’re after, get in touch via <a href="mailto:hello@atelierdesigns.com" className="underline">hello@atelierdesigns.com</a>.
        </p>
        <dl className="mt-10 space-y-6">
          {QUESTIONS.map((item) => (
            <div key={item.q} className="rounded-3xl border border-black/10 bg-[#f9f9f9] p-6 shadow-[0_12px_24px_rgba(15,18,24,0.06)]">
              <dt className="text-lg font-semibold">{item.q}</dt>
              <dd className="mt-2 text-sm text-black/70">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
