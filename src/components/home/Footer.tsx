import { CONTACT } from "@/data/lenses";

/** Footer / contact (node 525:322). */
export default function Footer() {
  return (
    <footer
      id="contact"
      className="flex flex-col gap-[48px] border-t border-[#22204a] bg-[#0e0d22] px-6 pb-[40px] pt-[64px] lg:px-[132px] lg:pt-[96px]"
    >
      <p className="home-display max-w-[900px] text-[clamp(34px,4.45vw,64px)] font-bold leading-[1.02] tracking-[-1.28px] text-[#f3f1ff]">
        The next interface hasn’t been invented yet. Let’s design it.
      </p>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <a
          href={`mailto:${CONTACT.email}`}
          className="home-body text-[clamp(20px,1.8vw,26px)] font-medium text-[#b49cff] transition-opacity hover:opacity-80"
        >
          {CONTACT.email}
        </a>

        <div className="home-body flex items-center gap-[28px] text-[15px] text-[#f3f1ff]">
          {CONTACT.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-60"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
