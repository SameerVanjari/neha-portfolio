"use client";

import data from "@/data/portfolio.json";
import { FOOTER_LINKS } from "@/data/landing";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

export default function SiteFooter() {
  const email = data.profile.email;

  return (
    <footer id="contact" className="bg-[#17161B]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[64px] px-6 pb-[56px] pt-[80px] md:pt-[120px] lg:px-0">
        <div className="flex w-full flex-col items-start gap-[48px] lg:flex-row lg:items-end lg:gap-[126px]">
          <div className="flex w-full max-w-[690px] flex-col items-start gap-[22px]">
            <h2
              className="text-[48px] font-semibold tracking-[-1.5px] text-[#F2EEE7] md:text-[60px]"
              style={DISPLAY}
            >
              Let&apos;s talk.
            </h2>
            <p
              className="max-w-[520px] text-[18px] font-normal leading-[1.6] text-[#E4DED4]"
              style={BODY}
            >
              Open to full-time Product and Experience Design roles in AI and XR. Based in
              Charlotte, NC, and available now.
            </p>
            <a
              href={`mailto:${email}`}
              className="border-b border-[rgba(242,238,231,0.4)] pb-[6px] text-[26px] font-medium text-[#F2EEE7] transition-opacity hover:opacity-80 md:text-[34px]"
              style={BODY}
            >
              {email}
            </a>
          </div>

          <nav aria-label="Contact links" className="w-full max-w-[384px] lg:ml-auto" style={BODY}>
            {FOOTER_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className={`flex w-full items-center justify-between py-[18px] text-[16px] transition-opacity hover:opacity-80 ${
                  i === FOOTER_LINKS.length - 1
                    ? "border-y border-[rgba(242,238,231,0.2)]"
                    : "border-t border-[rgba(242,238,231,0.2)]"
                }`}
              >
                <span className="font-normal text-[#F2EEE7]">{link.label}</span>
                <span className="font-normal text-[#CFC8BD]">{link.value}</span>
              </a>
            ))}
          </nav>
        </div>

        <div
          className="flex w-full items-center justify-between border-t border-[rgba(242,238,231,0.14)] pt-[24px] text-[13px] font-normal text-[#B9B2A8]"
          style={BODY}
        >
          <p>© 2026 Neha Mayacharya</p>
          <p>Charlotte, North Carolina</p>
        </div>
      </div>
    </footer>
  );
}
