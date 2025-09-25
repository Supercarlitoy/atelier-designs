import { ProfileRecord } from "@/types/profile";

export type ProfileAboutProps = {
  profile: ProfileRecord;
};

export function ProfileAbout({ profile }: ProfileAboutProps) {
  const socialEntries = Object.entries(profile.social ?? {}).filter(([, value]) => Boolean(value));

  return (
    <section className="rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-8 text-black shadow-[0_18px_48px_rgba(15,18,24,0.08)] md:p-12">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3rem] text-black/40">About</p>
          <p className="mt-3 text-lg text-black/80 md:text-xl">{profile.bio}</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/40">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              <li>
                <a href={`mailto:${profile.email}`} className="underline transition-colors hover:text-black">
                  {profile.email}
                </a>
              </li>
              {profile.phone ? <li><a href={`tel:${profile.phone}`} className="underline transition-colors hover:text-black">{profile.phone}</a></li> : null}
              <li>
                <a href={profile.website} target="_blank" rel="noreferrer" className="underline transition-colors hover:text-black">
                  {profile.website}
                </a>
              </li>
            </ul>
          </div>
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
          {socialEntries.length ? (
            <div>
              <p className="text-xs uppercase tracking-[0.3rem] text-black/40">Connect</p>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                {socialEntries.map(([network, url]) => (
                  <li key={network}>
                    <a
                      href={url as string}
                      target="_blank"
                      rel="noreferrer"
                      className="underline transition-colors hover:text-black"
                    >
                      {network.replace(/^[a-z]/, (c) => c.toUpperCase())}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
