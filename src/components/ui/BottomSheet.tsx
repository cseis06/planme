"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const sheetRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sheet   = sheetRef.current;
    const overlay = overlayRef.current;
    if (!sheet || !overlay) return;

    if (open) {
      gsap.set(overlay, { display: "block" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
      gsap.fromTo(sheet, { y: "100%" }, { y: "0%", duration: 0.38, ease: "cubic-bezier(0.32,0.72,0,1)" });
    } else {
      gsap.to(sheet,   { y: "100%", duration: 0.28, ease: "power2.in" });
      gsap.to(overlay, {
        opacity:    0,
        duration:   0.22,
        ease:       "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{
          display:    "none",
          position:   "fixed",
          inset:      0,
          zIndex:     100,
          background: "rgba(110, 86, 69, 0.35)",
          backdropFilter: "blur(2px)",
        }}
      />

      <div
        ref={sheetRef}
        style={{
          position:     "fixed",
          bottom:       0,
          left:         0,
          right:        0,
          zIndex:       101,
          background:   "var(--paper)",
          borderTop:    "2px solid var(--brown-line)",
          borderRadius: "var(--r-lg) var(--r-lg) 0 0",
          boxShadow:    "0 -12px 40px -8px rgba(122, 92, 72, 0.35)",
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
          transform:    "translateY(100%)",
          willChange:   "transform",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 4 }}>
          <div
            style={{
              width:        40,
              height:       4,
              borderRadius: 99,
              background:   "var(--brown)",
              opacity:      0.4,
            }}
          />
        </div>

        {title && (
          <div
            style={{
              padding:       "8px 20px 14px",
              borderBottom:  "2px dashed var(--brown)",
              fontFamily:    "var(--font-pixelify), monospace",
              fontWeight:    700,
              fontSize:      15,
              color:         "var(--ink)",
            }}
          >
            {title}
          </div>
        )}

        <div style={{ padding: "16px 20px 8px" }}>
          {children}
        </div>
      </div>
    </>
  );
}