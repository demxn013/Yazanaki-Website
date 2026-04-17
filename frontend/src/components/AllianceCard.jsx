import React from "react";
import Emblem from "./Emblem";

export default function AllianceCard({
  code,
  name,
  label,
  status,
  description,
  emblem,
}) {
  return (
    <article
      data-testid={`alliance-card-${(code || name).toLowerCase()}`}
      className="relative p-7 rounded-[12px] border border-line overflow-hidden group transition-colors duration-200 hover:border-accent/70"
      style={{
        background:
          "linear-gradient(180deg, rgba(23,28,34,0.9) 0%, rgba(17,21,26,0.9) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at 85% -20%, rgba(198,168,91,0.10), transparent 55%)",
        }}
      />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Emblem
              code={code || name}
              src={emblem}
              size={56}
              testId={`alliance-emblem-${(code || name).toLowerCase()}`}
            />
            <div>
              <h3 className="text-[22px] font-semibold text-primary tracking-tight leading-none">
                {name}
              </h3>
              <div className="text-[12px] text-secondary tracking-[0.24em] uppercase mt-2">
                {label}
              </div>
            </div>
          </div>

          {/* Crimson "Active" state — used strictly for the active marker */}
          <span
            className="badge-active"
            data-testid={`alliance-status-${(code || name).toLowerCase()}`}
          >
            <span className="pulse" />
            {status}
          </span>
        </div>

        <div className="hairline" />

        <p className="text-[14px] leading-[1.7] text-secondary max-w-xl">
          {description}
        </p>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="p-3 rounded-[10px] border border-line bg-background/60">
            <div className="text-[11px] tracking-[0.22em] text-muted uppercase">
              Relation
            </div>
            <div className="text-[14px] text-primary mt-1">Formal</div>
          </div>
          <div className="p-3 rounded-[10px] border border-line bg-background/60">
            <div className="text-[11px] tracking-[0.22em] text-muted uppercase">
              Control
            </div>
            <div className="text-[14px] text-primary mt-1">External</div>
          </div>
          <div className="p-3 rounded-[10px] border border-line bg-background/60">
            <div className="text-[11px] tracking-[0.22em] text-muted uppercase">
              Terms
            </div>
            <div className="text-[14px] text-primary mt-1">Scalable</div>
          </div>
        </div>
      </div>
    </article>
  );
}
