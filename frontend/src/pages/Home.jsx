import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroNetwork from "../components/HeroNetwork";
import ClanCard from "../components/ClanCard";
import AllianceCard from "../components/AllianceCard";
import SectionHeader from "../components/SectionHeader";
import {
  empire,
  getCoreClanList,
  getAllianceList,
  getLandingStats,
  philosophy,
} from "../data";

export default function Home() {
  const coreClans = getCoreClanList();
  const alliances = getAllianceList();
  const stats = getLandingStats();

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section
        data-testid="hero-section"
        className="relative overflow-hidden border-b border-line"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          aria-hidden
        >
          <div className="absolute inset-0 bg-grid-soft mask-radial" />
        </div>

        <div className="max-w-container mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-12 md:gap-10 items-center relative">
          <div className="flex flex-col gap-7 animate-fadeUp">
            <div className="flex items-center gap-3 text-[12px] tracking-[0.28em] text-muted uppercase">
              <span className="w-8 h-px bg-line" />
              Structured Empire · Private Network
            </div>

            <h1 className="text-[44px] md:text-[56px] leading-[1.04] font-semibold text-primary tracking-tight">
              {empire.name}
              <span className="block text-secondary font-normal text-[22px] md:text-[24px] mt-4 max-w-lg leading-[1.55]">
                {empire.tagline}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/clans"
                data-testid="hero-explore-structure"
                className="btn-primary"
              >
                Explore Structure
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/alliances"
                data-testid="hero-view-alliances"
                className="btn-secondary"
              >
                View Alliances
              </Link>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "Divisions", v: String(empire.coreClans.length).padStart(2, "0") },
                { k: "Alliance", v: String(empire.alliances.length).padStart(2, "0") },
                { k: "Posture", v: "Stable" },
              ].map((s) => (
                <div key={s.k} className="flex flex-col gap-1.5">
                  <div className="text-[24px] font-semibold text-primary tracking-tight">
                    {s.v}
                  </div>
                  <div className="text-[11px] tracking-[0.24em] uppercase text-muted">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative md:pl-6 animate-fadeUp" style={{ animationDelay: "120ms" }}>
            <HeroNetwork />
          </div>
        </div>
      </section>

      {/* Stats bar — loops through getLandingStats() */}
      <section
        data-testid="stats-bar"
        className="border-b border-line bg-surface/60"
      >
        <div className="max-w-container mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-testid={`stats-item-${i}`}
              className="flex items-baseline gap-4 px-0 sm:px-8 first:pl-0 last:pr-0 py-4 sm:py-2"
            >
              <div className="text-[36px] font-semibold text-primary tracking-tight">
                {s.value}
              </div>
              <div className="text-[13px] tracking-[0.24em] uppercase text-secondary">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structure preview — loops through empire.coreClans via getCoreClanList() */}
      <section
        data-testid="structure-preview"
        className="max-w-container mx-auto px-6 py-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Core Structure"
            title="Five autonomous clans."
            description="Yazanaki's clans represent the empire's presence across different servers. Each operates independently — not tied to any single specialization."
          />
          <Link
            to="/clans"
            data-testid="structure-view-all"
            className="btn-secondary self-start md:self-end"
          >
            View all divisions
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreClans.map((c, i) => (
            <ClanCard key={c.code} {...c} index={i} />
          ))}
        </div>
      </section>

      <div className="max-w-container mx-auto px-6">
        <div className="hairline" />
      </div>

      {/* Alliance preview — loops through empire.alliances */}
      <section
        data-testid="alliance-preview"
        className="max-w-container mx-auto px-6 py-24"
      >
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-14 items-start">
          <SectionHeader
            eyebrow="External Alliance"
            title="Structured agreements, not recruitment."
            description="Yazanaki does not absorb external factions. It contracts with them — formally, economically, and on scalable terms."
          />
          <div className="flex flex-col gap-5">
            {alliances.map((a) => (
              <AllianceCard key={a.code} {...a} />
            ))}
            <a
              data-testid="alliance-preview-discord"
              href={empire.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary self-start"
            >
              Request Alliance via Discord
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy — loops through philosophy data */}
      <section data-testid="philosophy-section" className="border-t border-line">
        <div className="max-w-container mx-auto px-6 py-24">
          <SectionHeader
            eyebrow="Philosophy"
            title="Three rules that hold the empire together."
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {philosophy.map((p, i) => (
              <div
                key={p.title}
                data-testid={`philosophy-item-${i}`}
                className="card-base p-7 animate-fadeUp"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-[12px] tracking-[0.28em] text-muted uppercase mb-5">
                  {String(i + 1).padStart(2, "0")} / {String(philosophy.length).padStart(2, "0")}
                </div>
                <h3 className="text-[20px] font-semibold text-primary leading-snug mb-4">
                  {p.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-secondary">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
