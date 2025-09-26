import Link from "next/link";

const CTAS = [
  { href: "/", label: "Back to homepage" },
  { href: "/designers", label: "Browse designers" },
  { href: "/contact", label: "Contact support" }
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#06080c] text-white">
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1f2a60] blur-3xl opacity-60" aria-hidden />
          <div className="absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 rounded-full bg-[#3a85f6] blur-[160px] opacity-50" aria-hidden />
        </div>
        <p className="text-[12px] uppercase tracking-[0.5rem] text-white/70">Error 404</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          The page you were looking for has stepped out of the studio.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
          It may have moved to a new collection or never existed. Try one of the curated paths below or head back to the homepage.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          {CTAS.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="w-full rounded-full border border-white/15 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35rem] text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a85f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080c] sm:w-auto"
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
