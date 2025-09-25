import { ProfileRecord } from "@/types/profile";

export type ProfileAboutProps = {
  profile: ProfileRecord;
};

export function ProfileAbout({ profile }: ProfileAboutProps) {
  return (
    <section className="rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-8 text-black shadow-[0_18px_48px_rgba(15,18,24,0.08)] md:p-12">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3rem] text-black/40">About</p>
          <p className="mt-3 text-lg text-black/80 md:text-xl">{profile.bio}</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/40">Highlights</p>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              {profile.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-[6px] h-1 w-1 rounded-full bg-black" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/40">Connect</p>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              {Object.entries(profile.social).map(([network, url]) =>
                url ? (
                  <li key={network}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline transition-colors hover:text-black"
                    >
                      {network}
                    </a>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
