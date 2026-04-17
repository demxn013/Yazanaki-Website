import React from "react";
import SectionHeader from "../components/SectionHeader";
import { TrendingUp, Landmark, Network } from "lucide-react";

const SYSTEMS = [
  {
    icon: TrendingUp,
    key: "economy",
    title: "Economy",
    lead: "Measured trade. Engineered efficiency.",
    points: [
      "Optimized trade pipelines across divisions",
      "Resource flow efficiency as a governance metric",
      "Market awareness, not market speculation",
      "Controlled reinvestment into structural expansion",
    ],
  },
  {
    icon: Landmark,
    key: "governance",
    title: "Governance",
    lead: "Centralized authority. Structured divisions.",
    points: [
      "Single governance layer across all five divisions",
      "Defined roles for SNU, ANO, ONF, ONA, and KASAII",
      "Internal doctrine reviewed, not improvised",
      "No personality-driven leadership vacuums",
    ],
  },
  {
    icon: Network,
    key: "alliances",
    title: "Alliances",
    lead: "Contract-based. Scalable by design.",
    points: [
      "Formal written terms over informal understandings",
      "Scalable agreements by faction size and posture",
      "Economic integration without internal absorption",
      "Reviewable clauses, measurable contribution",
    ],
  },
];

export default function Systems() {
  return (
    <div data-testid="systems-page">
      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 pt-20 pb-14">
          <SectionHeader
            eyebrow="Systems"
            title="Internal logic driving expansion and control."
            description="Three operational layers keep the Yazanaki Empire stable under scale: economic discipline, structured governance, and formal alliance framework."
          />
        </div>
      </section>

      <section className="max-w-container mx-auto px-6 py-20 flex flex-col gap-5">
        {SYSTEMS.map((s, i) => (
          <article
            key={s.key}
            data-testid={`system-${s.key}`}
            className="card-base p-7 md:p-10 grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 animate-fadeUp"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex md:flex-col gap-5 md:gap-6 items-start">
              <div className="w-12 h-12 rounded-[12px] border border-line flex items-center justify-center text-accent">
                <s.icon size={18} />
              </div>
              <div>
                <div className="text-[12px] tracking-[0.3em] text-muted uppercase">
                  Layer {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-[28px] font-semibold text-primary mt-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-[14px] text-secondary mt-2 leading-[1.6]">
                  {s.lead}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="hairline mb-6 md:hidden" />
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {s.points.map((p, idx) => (
                  <li
                    key={p}
                    data-testid={`system-${s.key}-point-${idx}`}
                    className="flex items-start gap-3 text-[14px] text-secondary leading-[1.6]"
                  >
                    <span className="mt-[9px] w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
