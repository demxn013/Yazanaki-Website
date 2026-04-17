import React from "react";

/**
 * Emblem
 * Reusable container that guarantees emblems display with original colors.
 *
 *  - 56x56 container with a slightly-lighter surface (#151A20)
 *  - Inner image capped to ~70% of the box, object-fit: contain
 *  - NO CSS filters — original PNG colors preserved exactly
 *  - NO tint overlays or color manipulation
 *  - Subtle low-opacity crimson ring on hover
 *
 * Falls back to rendering the clan/faction `code` in primary white text
 * if no image src is provided.
 */
export default function Emblem({
  src,
  alt = "",
  code = "",
  size = 56,
  className = "",
  testId,
}) {
  const innerMax = Math.round(size * 0.7);

  return (
    <div
      data-testid={testId}
      className={`emblem-container group/emblem ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt={alt || code}
          className="emblem-img"
          style={{
            maxWidth: innerMax,
            maxHeight: innerMax,
            filter: "none",
          }}
          draggable={false}
        />
      ) : (
        <span
          className="font-semibold tracking-[0.12em] text-primary"
          style={{
            fontSize: size <= 40 ? 11 : 13,
            lineHeight: 1,
          }}
        >
          {code.slice(0, 4).toUpperCase()}
        </span>
      )}
    </div>
  );
}