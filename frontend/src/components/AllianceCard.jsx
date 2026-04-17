import React from "react";
import { Handshake } from "lucide-react";

export default function AllianceCard({ name, label, status, description }) {
  return (
    <article
      data-testid={`alliance-card-${name.toLowerCase()}`}
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
            "radial-gradient(600px circle at 85% -20%, rgba(198,168,91,0.12), transparent 55%)",
        }}
      />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-[10px] border border-line bg-background">
              <Handshake size={16} className="text-accent" />
            </span>
            <div>
              <h3 className="text-[22px] font-semibold text-primary tracking-tight">
                {name}
              </h3>
              <div className="text-[12px] text-secondary tracking-[0.24em] uppercase mt-0.5">
                {label}
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-2 text-[12px] text-accent tracking-[0.24em] uppercase"
            data-testid={`alliance-status-${name.toLowerCase()}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulseNode" />
            {status}
          </div>
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
