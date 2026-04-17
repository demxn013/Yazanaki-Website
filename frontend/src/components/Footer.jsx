import React from "react";

export default function Footer() {
  return (
    <footer
      data-testid="global-footer"
      className="border-t border-line mt-24"
    >
      <div className="max-w-container mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-block w-[18px] h-[18px] rounded-[5px] border border-line relative overflow-hidden">
            <span className="absolute inset-[2px] rounded-[3px] bg-accent/90" />
            <span className="absolute inset-[5px] rounded-[2px] bg-background" />
          </span>
          <span className="text-[13px] tracking-[0.22em] text-secondary">
            YAZANAKI EMPIRE
          </span>
        </div>

        <div className="flex items-center gap-8 text-[13px] text-muted">
          <span>Structured Governance</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Controlled Expansion</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Formal Agreements</span>
        </div>

        <div className="text-[12px] text-muted tracking-wider">
          © {new Date().getFullYear()} Yazanaki Empire. Internal system.
        </div>
      </div>
    </footer>
  );
}
