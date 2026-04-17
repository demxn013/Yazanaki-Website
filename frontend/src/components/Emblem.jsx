import React from "react";

/**
 * Emblem
 * Reusable container that guarantees dark emblems stay legible.
 *
 *  - 56x56 container with a slightly-lighter surface (#151A20)
 *  - Inner image capped to ~70% of the box, object-fit: contain
 *  - No color manipulation, no glow, no outline on the image itself
 *  - A subtle low-opacity gold ring, slightly stronger on hover
 *
 * Accepts either an image `src` (preferred when emblem assets exist)
 * or falls back to rendering the clan/faction `code` in accent gold.
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
          }}
          draggable={false}
        />
      ) : (
        <span
          className="font-semibold tracking-[0.12em] text-accent"
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
