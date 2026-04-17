import React from "react";
import { Lock } from "lucide-react";
import Emblem from "./Emblem";

export default function ClanCard({
  code,
  name,
  role,
  description,
  emblem,
  index = 0,
}) {
  return (
    <article
      data-testid={`clan-card-${code.toLowerCase()}`}
      className="card-base p-6 flex flex-col gap-5 group animate-fadeUp"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Emblem
            code={code}
            src={emblem}
            size={56}
            testId={`clan-emblem-${code.toLowerCase()}`}
          />
          <div>
            <h3 className="text-[22px] font-semibold text-primary tracking-tight leading-none">
              {name}
            </h3>
            <div className="text-[12px] text-secondary tracking-[0.24em] uppercase mt-2">
              Permanent Division
            </div>
          </div>
        </div>
        <span className="tag-locked" data-testid={`clan-tag-${code.toLowerCase()}`}>
          <Lock size={10} />
          Locked Structure
        </span>
      </div>

      <div className="hairline" />

      <div className="flex flex-col gap-3">
        <div className="text-[13px] uppercase tracking-[0.22em] text-muted">
          {role}
        </div>
        <p className="text-[14px] leading-[1.65] text-secondary">
          {description}
        </p>
      </div>
    </article>
  );
}
