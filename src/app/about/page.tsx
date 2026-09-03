import data from "@/data/portfolio.json";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/site/reveal";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">About</p>
        <h1 className="text-display mt-3 max-w-3xl text-3xl font-bold tracking-[-0.03em] md:text-5xl">
          Intelligence should feel less like a machine and more like a <span className="font-light text-muted-foreground">kind companion.</span>
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_0.9fr]">
        <Reveal delay={0.08}>
          <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
            <p className="text-foreground text-lg leading-relaxed">{data.profile.bio}</p>
            <p>
              Over seven years I&apos;ve worked across conversational AI, spatial computing and product systems — from
              research synthesis to shipping production interfaces. My practice bridges three realities: the
              conversational (LLMs, voice, agents), the spatial (XR, hand tracking, immersive worlds), and the everyday
              (design systems, flows, product strategy).
            </p>
            <p>
              Whether it&apos;s a voice companion for healthcare, a hand-tracked XR onboarding, or a trust-first AI
              assistant, the question is always the same: how do we make intelligence feel human, legible, and kind?
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {data.profile.roles.map((r) => (
                <Badge key={r} variant="secondary" className="rounded-full">
                  {r}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="text-sm font-semibold">{data.profile.name} · {data.profile.location}</div>
                <a href={`mailto:${data.profile.email}`} className="text-sm text-primary hover:underline">
                  {data.profile.email}
                </a>
              </div>
              <Separator />
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Availability</dt>
                  <dd className="font-medium">{data.profile.availability}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Experience</dt>
                  <dd className="font-medium">07+ years</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="font-medium">AI · XR · UX</dd>
                </div>
              </dl>
              <Separator />
              <div className="flex flex-wrap gap-2">
                {data.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-accent"
                  >
                    {s.label} — {s.handle}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="mt-16">
          <h2 className="text-display text-xl font-semibold tracking-tight">What I do</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.islands.map((island) => (
              <div key={island.id} className="rounded-xl border bg-card p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: island.color }} />
                  <span className="text-xs font-semibold tracking-widest">{island.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{island.stat}</span>
                </div>
                <h3 className="text-display font-semibold">{island.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{island.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
