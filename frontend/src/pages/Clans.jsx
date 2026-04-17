import React from "react";
import SectionHeader from "../components/SectionHeader";
import ClanCard from "../components/ClanCard";
import { Icon } from "../components/Icon";
import { getCoreClanList } from "../data";

// Clan-page principles — clans represent Yazanaki presence across servers.
// They are not specialized divisions (no "governance clan" or "economy clan").
const CLAN_PRINCIPLES = [
  {
    icon: "Lock",
    title: "Autonomous",
    body:
      "Each clan runs its own day-to-day operations without central interference.",
  },
  {
    icon: "Layers",
    title: "Non-Specialized",
    body:
      "Clans do not focus on a single domain such as PvP or economy — they are full-spectrum.",
  },
  {
    icon: "ShieldCheck",
    title: "Server-Anchored",
    body:
      "Each clan represents Yazanaki presence on a different server, not a different function.",
  },
];

export default function Clans() {
  const coreClans = getCoreClanList();

  return (
    <div data-testid="clans-page">
      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 pt-20 pb-16">
          <SectionHeader
            eyebrow="Core Clans"
            title="Autonomous Yazanaki branches across different servers."
            description="Clans are not specialized divisions. They operate independently, do not focus on a single domain, and represent the Yazanaki Empire's presence on different servers."
          />

          <div
            data-testid="clans-autonomy-note"
            className="card-base p-7 mt-10"
          >
            <div className="text-[12px] tracking-[0.3em] text-accent uppercase mb-4">
              How coordination works
            </div>
            <p className="text-[15px] leading-[1.75] text-secondary max-w-3xl">
              Each clan operates independently and does not serve a singular
              function. They act as Yazanaki branches across different servers.
            </p>
            <p className="text-[15px] leading-[1.75] text-secondary max-w-3xl mt-4">
              Empire-wide operations — strategy, coordination, and economic
              decisions — are handled by selected members drawn from all clans,
              not by any single clan.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {CLAN_PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                data-testid={`clans-principle-${i}`}
                className="card-base p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-[10px] border border-line flex items-center justify-center text-accent shrink-0">
                  <Icon name={p.icon} size={16} />
                </div>
                <div>
                  <div className="text-[15px] text-primary font-medium">
                    {p.title}
                  </div>
                  <div className="text-[13px] text-secondary mt-1 leading-[1.6]">
                    {p.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreClans.map((c, i) => (
            <ClanCard key={c.code} {...c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
