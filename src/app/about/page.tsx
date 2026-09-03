"use client";

import Nav from "@/components/Nav";
import { THEMES } from "@/data/themes";
import data from "@/data/portfolio.json";
import Link from "next/link";

const NEHA_PHOTO_1 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop";
const NEHA_PHOTO_2 = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=900&auto=format&fit=crop";

const EXPERTISE: { title: string; items: string[] }[] = [
  { title: "Product & Systems", items: ["Design systems & tokens", "Product strategy", "Interaction & motion"] },
  { title: "AI Experience", items: ["Conversational & agent UX", "Prompt & output design", "Human-in-the-loop"] },
  { title: "Spatial & XR", items: ["AR / VR / MR product design", "Hand & eye tracking", "Spatial prototyping (Unity, WebXR)"] },
];

export default function AboutPage() {
  const theme = THEMES.product; // neutral anchor — theme carries softly

  return (
    <>
      <Nav theme={theme} activeSection="about" />
      <main className="pt-[64px]">
        {/* hero with photos */}
        <section className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="h-px w-full bg-black/5" />
          <div className="grid gap-8 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-14">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-black/10" />
                <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-500">ABOUT — NEHA</span>
              </div>

              <h1 className="font-display text-[32px] font-semibold leading-[0.9] tracking-[-0.04em] text-zinc-900 md:text-[44px] lg:text-[48px]" style={{ fontFamily: "var(--font-display)" }}>
                Perception,
                <br />
                built for people.
              </h1>

              <p className="max-w-[560px] text-[16px] leading-[1.7] text-zinc-600 md:text-[17px]" style={{ fontFamily: "var(--font-body)" }}>
                {data.profile.bio}
              </p>
              <p className="max-w-[540px] text-[14px] leading-[1.6] text-zinc-500">{data.profile.tagline}</p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {data.profile.roles.map((r) => (
                  <span key={r} className="rounded-full border bg-white px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-zinc-600" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                    {r}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {(data as unknown as { stats: { value: string; label: string }[] }).stats.map((s) => (
                  <div key={s.label} className="rounded-[14px] border bg-white px-4 py-3" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div className="font-display text-[20px] font-semibold tracking-[-0.03em] text-zinc-900">{s.value}</div>
                    <div className="font-mono text-[10px] tracking-[0.12em] text-zinc-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* photos */}
            <div className="grid gap-4 lg:pl-6">
              <div className="overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={NEHA_PHOTO_1} alt="Neha — portrait" className="aspect-[4/3] w-full object-cover" />
                <div className="px-4 py-3">
                  <div className="font-mono text-[10px] tracking-[0.14em] text-zinc-500">Neha · Bangalore · Remote worldwide</div>
                  <div className="font-display text-[13px] font-medium text-zinc-900">Designing where intelligence meets human need.</div>
                </div>
              </div>
              <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
                <div className="overflow-hidden rounded-[20px] border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={NEHA_PHOTO_2} alt="Neha — working" className="aspect-[4/3] w-full object-cover" />
                </div>
                <div className="rounded-[20px] border bg-zinc-900 p-5 text-white" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="font-mono text-[10px] tracking-[0.14em] text-white/40">Contact</div>
                  <a href={`mailto:${data.profile.email}`} className="mt-2 block font-mono text-[12px] font-medium text-white underline decoration-white/20 underline-offset-4 hover:decoration-white">
                    {data.profile.email}
                  </a>
                  <div className="mt-4 h-px w-full bg-white/10" />
                  <div className="mt-3 font-mono text-[10px] tracking-[0.12em] text-white/40">Availability</div>
                  <div className="font-mono text-[11px] text-white">Open for select collaborations</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-black/5" />
        </section>

        {/* expertise */}
        <section className="mx-auto max-w-[1280px] px-6 py-10 md:px-8 md:py-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-black/10" />
            <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-500">EXPERTISE</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {EXPERTISE.map((col) => (
              <div key={col.title} className="rounded-[16px] border bg-white p-5" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="font-display text-[13px] font-semibold tracking-[-0.02em] text-zinc-900">{col.title}</div>
                <ul className="mt-3 space-y-2">
                  {col.items.map((it) => (
                    <li key={it} className="font-mono text-[11px] leading-[1.6] tracking-[0.02em] text-zinc-500">
                      · {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* skills */}
        <section className="mx-auto max-w-[1280px] px-6 pb-10 md:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-black/10" />
            <span className="font-mono text-[11px] tracking-[0.22em] text-zinc-500">SKILLS & TOOLKIT</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {(data as unknown as { skills: string[] }).skills.map((s) => (
              <span key={s} className="rounded-full border bg-white px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-zinc-700" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                {s}
              </span>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Link href="/projects" className="rounded-full bg-zinc-900 px-6 py-3 font-mono text-[12px] tracking-[0.14em] text-white hover:bg-zinc-800">View projects →</Link>
            <Link href="/#contact" className="rounded-full border bg-white px-6 py-3 font-mono text-[12px] tracking-[0.14em] text-zinc-700" style={{ borderColor: "rgba(0,0,0,0.08)" }}>Contact</Link>
          </div>
        </section>

        {/* journey — kept compact */}
        <section className="mx-auto max-w-[1280px] px-6 pb-10 md:px-8">
          <div className="rounded-[20px] border bg-zinc-900 p-6 text-white md:p-7" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="font-mono text-[10px] tracking-[0.16em] text-white/40">Journey</div>
            <div className="mt-4 grid gap-6 md:grid-cols-4">
              {(data as unknown as { milestones: { year: string; title: string; description: string }[] }).milestones.map((m) => (
                <div key={m.year} className="border-t border-white/10 pt-4 first:border-0 first:pt-0 md:border-0 md:border-l md:pl-4 md:pt-0">
                  <div className="font-mono text-[11px] tracking-[0.14em] text-white/50">{m.year}</div>
                  <div className="mt-1 font-display text-[13px] font-semibold text-white">{m.title}</div>
                  <div className="mt-1 text-[12px] leading-[1.5] text-white/60">{m.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* footer hairline */}
        <footer className="mx-auto max-w-[1280px] px-6 pb-10 md:px-8">
          <div className="h-px w-full bg-black/5" />
          <div className="flex justify-start pt-6 font-mono text-[10px] tracking-[0.12em] text-zinc-400">
            <span>© 2026 NEHA</span>
          </div>
        </footer>
      </main>
    </>
  );
}
