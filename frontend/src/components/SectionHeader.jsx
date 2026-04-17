import React from "react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      {eyebrow && (
        <div
          className="text-[12px] tracking-[0.3em] text-accent uppercase"
          data-testid="section-eyebrow"
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-[32px] md:text-[36px] font-semibold text-primary tracking-tight leading-[1.1]"
        data-testid="section-title"
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-[15px] text-secondary leading-[1.7] max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
          data-testid="section-description"
        >
          {description}
        </p>
      )}
    </div>
  );
}
