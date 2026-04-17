import React from "react";
import SectionHeader from "../components/SectionHeader";
import ClanCard from "../components/ClanCard";
import { Icon } from "../components/Icon";
import { getCoreClanList, clansPrinciples } from "../data";

export default function Clans() {
  const coreClans = getCoreClanList();

  return (
    <div data-testid="clans-page">
      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 pt-20 pb-16">
          <SectionHeader
            eyebrow="Core Divisions"
            title="Permanent internal structure of the Yazanaki Empire."
            description="The internal divisions are not recruitment brands. They are fixed components of the empire's command framework — each with a defined operational role."
          />
          <div className="grid sm:grid-cols-3 gap-4 mt-12">
            {clansPrinciples.map((p, i) => (
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
