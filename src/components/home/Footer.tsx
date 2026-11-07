"use client";

import { useState } from "react";
import { CONTACT } from "@/data/lenses";

/** Footer — "Let's talk" (node 583:263). One footer for every page. */
export default function Footer() {
  const [orbLoaded, setOrbLoaded] = useState(false);

  return (
    <footer
      id="contact"
      className="relative flex flex-col gap-[28px] overflow-hidden border-t border-[#1c1a45] bg-[#0e0d22] px-6 pb-[40px] pt-[64px] lg:px-[132px] lg:pb-[72px] lg:pt-[96px]"
    >
      <p className="home-body text-[13px] font-semibold uppercase tracking-[2.34px] text-[#b49cff]">
        Let&rsquo;s talk
      </p>

      <p className="home-display relative z-10 max-w-[900px] text-[clamp(34px,3.6vw,52px)] font-bold leading-[1.08] text-[#f3f1ff]">
        The next interface hasn&rsquo;t been invented yet. Let&rsquo;s design it.
      </p>

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 pt-[20px]">
        <a
          href={`mailto:${CONTACT.email}`}
          className="home-body text-[clamp(20px,1.8vw,26px)] font-medium text-[#b49cff] transition-opacity hover:opacity-80"
        >
          {CONTACT.email}
        </a>

        <div className="home-body flex items-center gap-[28px] text-[16px] text-[#f3f1ff]">
          {CONTACT.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("/") ? undefined : "_blank"}
              rel={l.href.startsWith("/") ? undefined : "noreferrer"}
              className="transition-opacity hover:opacity-60"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Board image asset: orb-ai — pupil looks toward the email. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/hero/orb-ai-footer.png"
        alt=""
        aria-hidden
        loading="lazy"
        onLoad={() => setOrbLoaded(true)}
        data-loaded={orbLoaded}
        className="pointer-events-none absolute top-[33px] right-[132px] hidden size-[200px] object-cover lg:block"
      />
    </footer>
  );
}
