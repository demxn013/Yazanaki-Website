import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import AllianceCard from "../components/AllianceCard";
import ApplyDialog from "../components/ApplyDialog";
import { ALLIANCES } from "../data";
import { FileSignature, Maximize2, Coins, ArrowRight } from "lucide-react";

const SYSTEM_COLUMNS = [
  {
    icon: FileSignature,
    title: "Structured Agreements",
    body: "All alliances operate under formal, written terms. Nothing verbal. Nothing ambiguous. Each clause is reviewable.",
  },
  {
    icon: Maximize2,
    title: "Scalable Terms",
    body: "Agreements adapt to the allied faction's size, specialization, and posture. Not one-size-fits-all.",
  },
  {
    icon: Coins,
    title: "Economic Integration",
    body: "Controlled integration into trade flows and resource pipelines. Alliance value is measurable, not symbolic.",
  },
];

export default function Alliances() {
  const [applyOpen, setApplyOpen] = useState(false);

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
          <div className="text-[12px] tracking-[0.26em] text-muted uppercase">
            01 / 01
          </div>
        </div>
        <div className="grid gap-5">
          {ALLIANCES.map((a) => (
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
            {SYSTEM_COLUMNS.map((c, i) => (
              <div
                key={c.title}
                data-testid={`alliance-system-${i}`}
                className="card-base p-7 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-[10px] border border-line flex items-center justify-center text-accent">
                  <c.icon size={16} />
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

      <section className="max-w-container mx-auto px-6 py-24">
        <div
          data-testid="alliance-cta"
          className="relative rounded-[12px] border border-line overflow-hidden p-8 md:p-14"
          style={{
            background:
              "linear-gradient(120deg, #11151A 0%, #171C22 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(700px circle at 20% -10%, rgba(198,168,91,0.14), transparent 55%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-soft opacity-30 mask-radial pointer-events-none" />
          <div className="relative grid md:grid-cols-[1.4fr_1fr] items-center gap-10">
            <div>
              <div className="text-[12px] tracking-[0.3em] text-accent uppercase mb-4">
                Alliance Intake · Open
              </div>
              <h3 className="text-[32px] md:text-[38px] font-semibold text-primary leading-[1.1] tracking-tight">
                Apply for formal integration with the Yazanaki Empire.
              </h3>
              <p className="text-[15px] text-secondary leading-[1.7] mt-5 max-w-xl">
                Submissions are reviewed against structural fit, capacity, and
                specialization. Acceptance is neither automatic nor immediate.
              </p>
            </div>
            <div className="flex md:justify-end">
              <button
                data-testid="alliance-apply-cta"
                onClick={() => setApplyOpen(true)}
                className="btn-primary text-[16px] px-8 py-4"
              >
                Apply for Alliance
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <ApplyDialog open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}
