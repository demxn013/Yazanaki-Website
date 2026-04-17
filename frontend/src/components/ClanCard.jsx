import React from "react";
import { Lock } from "lucide-react";

export default function ClanCard({ code, name, role, description, index = 0 }) {
  return (
    <article
      data-testid={`clan-card-${code.toLowerCase()}`}
      className="card-base p-6 flex flex-col gap-5 group animate-fadeUp"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-9 h-9 rounded-[10px] border border-line text-[12px] tracking-[0.18em] text-accent font-medium group-hover:border-accent/70 transition-colors"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-[22px] font-semibold text-primary tracking-tight">
              {name}
            </h3>
            <div className="text-[12px] text-secondary tracking-[0.24em] uppercase mt-0.5">
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
