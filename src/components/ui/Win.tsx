"use client";

import type { ReactNode } from "react";

interface WinProps {
  title: string;
  variant?: "pink" | "sage" | "cream";
  className?: string;
  children: ReactNode;
}

export default function Win({ title, variant = "pink", children, className = "" }: WinProps) {
  const barBg: Record<string, string> = {
    pink:  "var(--pink-soft)",
    sage:  "var(--sage-soft)",
    cream: "var(--cream-2)",
  };

  return (
    <div
      className={className}
      style={{
        background:   "var(--paper)",
        border:       "2px solid var(--brown-line)",
        borderRadius: "var(--r-md)",
        boxShadow:    "0 0 0 3px #fff, var(--shadow)",
        overflow:     "hidden",
      }}
    >
      <div
        style={{
          display:       "flex",
          alignItems:    "center",
          gap:           8,
          padding:       "7px 12px",
          background:    barBg[variant],
          borderBottom:  "2px dashed var(--brown)",
          fontFamily:    "var(--font-pixelify), monospace",
          fontWeight:    700,
          fontSize:      13,
          color:         "var(--ink)",
          letterSpacing: ".3px",
        }}
      >
        {title}
        <span style={{ display: "flex", gap: 5, marginLeft: "auto" }}>
          {(["var(--pink)", "var(--butter)", "var(--sage)"] as const).map((bg, i) => (
            <b
              key={i}
              style={{
                width:        9,
                height:       9,
                borderRadius: "50%",
                border:       "1.5px solid var(--brown)",
                display:      "inline-block",
                background:   bg,
              }}
            />
          ))}
        </span>
      </div>
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}