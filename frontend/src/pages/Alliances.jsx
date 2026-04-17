import React from "react";
import SectionHeader from "../components/SectionHeader";
import AllianceCard from "../components/AllianceCard";
import { Icon } from "../components/Icon";
import {
  getAllianceList,
  allianceSystemColumns,
  allianceProcess,
  empire,
} from "../data";
import { ArrowRight } from "lucide-react";

export default function Alliances() {
  const alliances = getAllianceList();

  return (
    <div data-testid="alliances-page">
      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 pt-20 pb-12">
          <SectionHeader
            eyebrow="Alliances"
            title="External factions operating under structured agreements."
            description="The Yazanaki Empire does not absorb external factions. It contracts with them — formally, economically, and under defined terms."
          />
        </div>
      </section>

      <section className="max-w-container mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-8">
          <h3 className="text-[22px] font-semibold text-primary tracking-tight">
            Active Alliances
          </h3>
          <div
            className="text-[12px] tracking-[0.26em] text-muted uppercase"
            data-testid="alliances-count"
          >
            {String(alliances.length).padStart(2, "0")} /{" "}
            {String(empire.alliances.length).padStart(2, "0")}
          </div>
        </div>
        <div className="grid gap-5">
          {alliances.map((a) => (
            <AllianceCard key={a.code} {...a} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface/50">
        <div className="max-w-container mx-auto px-6 py-20">
          <SectionHeader
            eyebrow="Alliance System"
            title="How external integration works."
          />
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {allianceSystemColumns.map((c, i) => (
              <div
                key={c.title}
                data-testid={`alliance-system-${i}`}
                className="card-base p-7 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-[10px] border border-line flex items-center justify-center text-accent">
                  <Icon name={c.icon} size={16} />
                </div>
                <h4 className="text-[18px] text-primary font-semibold">
                  {c.title}
                </h4>
                <p className="text-[14px] text-secondary leading-[1.7]">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alliance Process — informational only, no form */}
      <section
        className="border-t border-line"
        data-testid="alliance-process-section"
      >
        <div className="max-w-container mx-auto px-6 py-24">
          <SectionHeader
            eyebrow="Alliance Process"
            title="How to initiate a formal agreement."
            description="There is no public application form. Alliances follow a structured, off-site process. Each step is gated and reviewed."
          />

          <ol className="grid md:grid-cols-2 gap-5 mt-14">
            {allianceProcess.map((s, i) => (
              <li
                key={s.step}
                data-testid={`alliance-process-step-${s.step}`}
                className="card-base p-7 flex gap-5 items-start animate-fadeUp"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-[10px] border border-line bg-elevated flex items-center justify-center text-accent text-[13px] tracking-[0.14em] font-medium shrink-0">
                  {String(s.step).padStart(2, "0")}
                </div>
                <div>
                  <h4 className="text-[18px] text-primary font-semibold leading-tight">
                    {s.title}
                  </h4>
                  <p className="text-[14px] text-secondary leading-[1.7] mt-2">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div
            data-testid="alliance-process-cta"
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-7 rounded-[12px] border border-line bg-elevated/60"
          >
            <div>
              <div className="text-[12px] tracking-[0.28em] text-muted uppercase">
                Entry Point
              </div>
              <div className="text-[16px] text-primary mt-2">
                All initiation happens through the Yazanaki Empire Discord.
              </div>
            </div>
            <a
              data-testid="alliance-discord-cta"
              href={empire.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Request Alliance via Discord
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
