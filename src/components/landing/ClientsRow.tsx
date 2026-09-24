"use client";

import data from "@/data/portfolio.json";
import { CLIENT_NOTE } from "@/data/landing";

const BODY = { fontFamily: "var(--font-body)" } as const;

export default function ClientsRow() {
  const clients = data.clients as string[];

  return (
    <section aria-label="Clients and collaborators" className="bg-[#F2EEE7]">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-[120px] lg:px-0">
        <div className="flex flex-col items-start gap-[22px]">
          <div className="flex w-full flex-wrap items-baseline justify-between gap-2 text-[13px] text-[#5C5750]" style={BODY}>
            <p className="font-medium uppercase tracking-[1.82px]">Clients &amp; collaborators</p>
            <p className="font-normal">{CLIENT_NOTE}</p>
          </div>
          <ul
            className="flex w-full flex-wrap items-start gap-x-8 gap-y-3 border-y border-[#DAD3C8] py-[30px] md:justify-between md:gap-x-0"
            style={BODY}
          >
            {clients.map((name) => (
              <li
                key={name}
                className="whitespace-nowrap text-[17px] font-semibold uppercase tracking-[1.02px] text-[#3A3833]"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
