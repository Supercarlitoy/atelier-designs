const SECTIONS = [
  {
    title: "Data we collect",
    content: "We collect minimal personal information—name, email, role, and studio for directory interactions—along with analytics events that help us improve matchmaking."
  },
  {
    title: "How we use your data",
    content: "Contact information is used to respond to enquiries, share shortlisted designers, and send opt-in newsletters. We never sell data to third parties."
  },
  {
    title: "Retention & deletion",
    content: "Profiles remain live while the studio participates in the directory. You may request edits or removal at any time by emailing privacy@atelierdesigns.com."
  }
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#fafafa] pb-24 pt-20 text-black">
      <article className="mx-auto max-w-4xl px-6">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/40">Privacy policy</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">How we handle your data.</h1>
        <p className="mt-4 text-base text-black/70 md:text-lg">
          Effective July 2025. We respect Melbourne’s creative community and handle every dataset with care.
        </p>
        <section className="mt-10 space-y-6 text-sm text-black/70 md:text-base">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-black">{section.title}</h2>
              <p className="mt-2">{section.content}</p>
            </div>
          ))}
        </section>
        <p className="mt-10 text-sm text-black/60">
          For any privacy questions, email <a href="mailto:privacy@atelierdesigns.com" className="underline">privacy@atelierdesigns.com</a>.
        </p>
      </article>
    </main>
  );
}
