export default function AboutPage() {
  return (
    <main className="bg-white pb-24 pt-20 text-black">
      <article className="mx-auto max-w-4xl px-6">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/40">About</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">A Melbourne-first directory built with creative partners.</h1>
        <p className="mt-6 text-base text-black/70 md:text-lg">
          Atelier Designs curates studios and independents who keep Melbourne’s design scene at the forefront. We vet every profile, audit live work twice a year, and run anonymous reference checks so clients can engage with confidence.
        </p>
        <section className="mt-12 space-y-6 text-sm text-black/70 md:text-base">
          <div>
            <h2 className="text-xl font-semibold text-black">Why we exist</h2>
            <p className="mt-3">
              Melbourne’s design scene was hard to navigate without insider knowledge. We wanted a single place where founders, cultural organisations, and product teams could discover practitioners by craft, scale, and neighbourhood—backed by credible outcomes.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black">How we curate</h2>
            <ul className="mt-3 space-y-2">
              <li>• Portfolio review across craft, storytelling, and execution quality.</li>
              <li>• Reference calls to confirm collaboration, communication, and delivery.</li>
              <li>• Diversity of practice: we showcase large independent studios through to micro teams.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black">What’s next</h2>
            <p className="mt-3">
              We’re expanding into motion, industrial, and gaming verticals, while collaborating with Melbourne universities to mentor emerging designers. Subscribe to the newsletter to hear about upcoming showcases and community events.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
