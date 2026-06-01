"use client";

import React from "react";

// ─── Paleta de relleno (igual que icons.js del prototipo) ─────
const CR = "#FFFCF6";   // crema
const SI = "#CDB9A6";   // puntos siamés
const EP = "#EFC9C5";   // interior oreja
const EY = "#8FBFCB";   // ojo azul siamés
const CK = "#F0B4B0";   // cachete
const SG = "#C9D8BD";   // sage
const PK = "#F2C9C5";   // rosa
const BT = "#EAD08C";   // mantequilla
const BL = "#BFE0E8";   // celeste agua

// ─── Helpers gatito ───────────────────────────────────────────
const ears =
  `<path d="M8.5 11 L6.8 4.2 L13.8 9" fill="${SI}"/>` +
  `<path d="M23.5 11 L25.2 4.2 L18.2 9" fill="${SI}"/>` +
  `<path d="M9.8 9.2 L8.9 5.6 L12.4 8.2 Z" fill="${EP}" stroke="none"/>` +
  `<path d="M22.2 9.2 L23.1 5.6 L19.6 8.2 Z" fill="${EP}" stroke="none"/>`;
const head = `<ellipse cx="16" cy="18" rx="9.6" ry="8.6" fill="${CR}"/>`;
const cheeks =
  `<circle cx="10.6" cy="20.4" r="1.7" fill="${CK}" stroke="none"/>` +
  `<circle cx="21.4" cy="20.4" r="1.7" fill="${CK}" stroke="none"/>`;

// ─── Diccionario de íconos ────────────────────────────────────
const ICONS: Record<string, string> = {
  /* ── Gatitos ── */
  "cat-happy":
    ears + head +
    `<path d="M11 17.6 q2.2 -2.6 4.3 0" stroke-width="1.5"/>` +
    `<path d="M16.7 17.6 q2.2 -2.6 4.3 0" stroke-width="1.5"/>` +
    cheeks +
    `<path d="M15 19.6 q1 1.1 2 0" stroke-width="1.3"/>`,

  "cat-normal":
    ears + head +
    `<circle cx="12.7" cy="17.4" r="1.9" fill="${EY}" stroke="none"/>` +
    `<circle cx="19.3" cy="17.4" r="1.9" fill="${EY}" stroke="none"/>` +
    `<circle cx="13.3" cy="16.8" r="0.55" fill="#fff" stroke="none"/>` +
    `<circle cx="19.9" cy="16.8" r="0.55" fill="#fff" stroke="none"/>` +
    cheeks +
    `<path d="M15.2 20.2 q0.8 0.9 1.6 0" stroke-width="1.2"/>` +
    `<path d="M4.5 18 h3.2 M4.5 20.5 h3" stroke-width="1.1"/>` +
    `<path d="M24.3 18 h3.2 M24.3 20.5 h3" stroke-width="1.1"/>`,

  "cat-wink":
    ears + head +
    `<path d="M11 17.4 q2.2 -2.6 4.3 0" stroke-width="1.5"/>` +
    `<circle cx="19.3" cy="17.4" r="1.9" fill="${EY}" stroke="none"/>` +
    `<circle cx="19.9" cy="16.8" r="0.55" fill="#fff" stroke="none"/>` +
    cheeks +
    `<path d="M15.2 20.2 q0.8 0.9 1.6 0" stroke-width="1.2"/>`,

  "cat-surprise":
    ears + head +
    `<circle cx="12.7" cy="17.4" r="2.2" fill="#fff"/>` +
    `<circle cx="19.3" cy="17.4" r="2.2" fill="#fff"/>` +
    `<circle cx="12.7" cy="17.4" r="1.15" fill="${EY}" stroke="none"/>` +
    `<circle cx="19.3" cy="17.4" r="1.15" fill="${EY}" stroke="none"/>` +
    cheeks +
    `<ellipse cx="16" cy="21" rx="1" ry="1.3" fill="${PK}" stroke="none"/>`,

  "cat-sleep":
    `<path d="M5.5 21.5 Q5.5 14.5 13 14.5 L22 14.5 Q27.5 14.5 27.5 19 Q27.5 23.2 22.5 23.2 L9 23.2 Q5.5 23.2 5.5 21.5 Z" fill="${CR}"/>` +
    `<path d="M11.5 14.6 L10.4 10.4 L15 13.4" fill="${SI}"/>` +
    `<path d="M9.5 19 q1.6 1.4 3.2 0" stroke-width="1.4"/>` +
    `<circle cx="14.5" cy="20.4" r="1.4" fill="${CK}" stroke="none"/>` +
    `<path d="M27.5 19 Q30.5 18.5 29.6 15.5" stroke-width="1.5"/>` +
    `<path d="M18.5 12.5 h3 l-3 3 h3" stroke-width="1.2"/>`,

  "paw":
    `<path d="M11 19.5 Q16 15.5 21 19.5 Q23.2 24.5 16 24.5 Q8.8 24.5 11 19.5 Z" fill="${PK}"/>` +
    `<circle cx="9.5" cy="15" r="2.1" fill="${CR}"/>` +
    `<circle cx="14.3" cy="12.4" r="2.1" fill="${CR}"/>` +
    `<circle cx="17.7" cy="12.4" r="2.1" fill="${CR}"/>` +
    `<circle cx="22.5" cy="15" r="2.1" fill="${CR}"/>`,

  /* ── Nav principal ── */
  "home":
    `<path d="M6 15.5 L16 6.5 L26 15.5"/>` +
    `<path d="M8.6 13.6 V25 H23.4 V13.6" fill="${CR}"/>` +
    `<path d="M13.4 25 V18.8 H18.6 V25" fill="${PK}"/>` +
    `<path d="M16 12.2 Q14.6 10.4 13.6 11.6 Q12.8 12.6 16 14.4 Q19.2 12.6 18.4 11.6 Q17.4 10.4 16 12.2 Z" fill="${CK}" stroke="none"/>`,

  "book":
    `<path d="M9 7.2 H21.5 Q24 7.2 24 9.4 V25 H11 Q9 25 9 23 Z" fill="${CR}"/>` +
    `<path d="M11.5 25 V8.6"/>` +
    `<path d="M17 13.6 Q15.8 12 14.8 13 Q14 13.8 17 15.6 Q20 13.8 19.2 13 Q18.2 12 17 13.6 Z" fill="${PK}" stroke="none"/>` +
    `<circle cx="17" cy="19" r="1.3" fill="${SG}" stroke="none"/>`,

  "basket":
    `<path d="M7.5 13 H24.5 L22.6 24 Q16 25.6 9.4 24 Z" fill="${CR}"/>` +
    `<path d="M9 13 Q16 4.5 23 13" stroke-width="1.7"/>` +
    `<path d="M7 13 Q16 9 25 13" stroke-width="1.6"/>` +
    `<path d="M12 13.4 V24.2" stroke-width="1.2"/>` +
    `<path d="M16 13.6 V24.9" stroke-width="1.2"/>` +
    `<path d="M20 13.4 V24.2" stroke-width="1.2"/>` +
    `<path d="M9.4 18.6 H22.6" stroke-width="1.2"/>`,

  "jar":
    `<rect x="9" y="6" width="14" height="3.6" rx="1.8" fill="${SG}"/>` +
    `<path d="M9.6 9.6 H22.4 V22 Q22.4 25 19.4 25 H12.6 Q9.6 25 9.6 22 Z" fill="${CR}"/>` +
    `<path d="M16 16.6 Q14.4 14.6 13.2 15.8 Q12.2 16.8 16 19 Q19.8 16.8 18.8 15.8 Q17.6 14.6 16 16.6 Z" fill="${PK}" stroke="none"/>` +
    `<path d="M13.6 12 H18.4" stroke-width="1.3"/>`,

  "calendar":
    `<rect x="6" y="8" width="20" height="18" rx="3.5" fill="${CR}"/>` +
    `<path d="M6 13.4 H26"/>` +
    `<path d="M11 6 V10" stroke-width="1.8"/>` +
    `<path d="M21 6 V10" stroke-width="1.8"/>` +
    `<path d="M16 18 Q14.6 16.2 13.5 17.3 Q12.6 18.2 16 20.4 Q19.4 18.2 18.5 17.3 Q17.4 16.2 16 18 Z" fill="${PK}" stroke="none"/>`,

  /* ── Objetos ── */
  "flower":
    `<circle cx="16" cy="16" r="3.2" fill="${BT}"/>` +
    `<ellipse cx="16" cy="9.8" rx="2.8" ry="3.4" fill="${PK}"/>` +
    `<ellipse cx="16" cy="22.2" rx="2.8" ry="3.4" fill="${PK}"/>` +
    `<ellipse cx="9.8" cy="16" rx="3.4" ry="2.8" fill="${PK}"/>` +
    `<ellipse cx="22.2" cy="16" rx="3.4" ry="2.8" fill="${PK}"/>` +
    `<ellipse cx="11.5" cy="11.5" rx="2.6" ry="3.2" fill="${SG}" transform="rotate(-45 11.5 11.5)"/>` +
    `<ellipse cx="20.5" cy="11.5" rx="2.6" ry="3.2" fill="${SG}" transform="rotate(45 20.5 11.5)"/>` +
    `<ellipse cx="11.5" cy="20.5" rx="2.6" ry="3.2" fill="${SG}" transform="rotate(45 11.5 20.5)"/>` +
    `<ellipse cx="20.5" cy="20.5" rx="2.6" ry="3.2" fill="${SG}" transform="rotate(-45 20.5 20.5)"/>`,

  "bow":
    `<path d="M16 16 Q10 10 6 12 Q4 14 6 16 Q4 18 6 20 Q10 22 16 16 Z" fill="${PK}"/>` +
    `<path d="M16 16 Q22 10 26 12 Q28 14 26 16 Q28 18 26 20 Q22 22 16 16 Z" fill="${PK}"/>` +
    `<circle cx="16" cy="16" r="2.8" fill="${CR}"/>` +
    `<circle cx="16" cy="16" r="1.4" fill="${PK}" stroke="none"/>`,

  "drop":
    `<path d="M16 6 Q10 13 10 18.5 Q10 24 16 24 Q22 24 22 18.5 Q22 13 16 6 Z" fill="${BL}"/>` +
    `<path d="M12.8 19.5 Q12 17 14.4 15.6" stroke-width="1.4"/>`,

  "leaf":
    `<path d="M8 24 Q8 12 20 8 Q24 16 16 22 Z" fill="${SG}"/>` +
    `<path d="M8 24 Q12 18 20 8" stroke-width="1.3"/>` +
    `<path d="M8 24 Q10 20 14 18" stroke-width="1.1"/>` +
    `<path d="M8 24 Q9 22 12 21" stroke-width="1.1"/>`,

  "strawberry":
    `<path d="M9 13 Q9 24 16 24 Q23 24 23 13 Q18 10 14 11 Z" fill="${PK}"/>` +
    `<path d="M12.5 8 Q11 11 13.5 12 Q14 9 16 8.5 Q18 9 18.5 12 Q21 11 19.5 8 Q16 5 12.5 8 Z" fill="${SG}"/>` +
    `<path d="M13 16.5 Q12 15 13 14 Q14 15.5 13 16.5 Z" fill="${CR}" stroke="none"/>` +
    `<path d="M17.5 19 Q16.5 17.5 17.5 16.5 Q18.5 18 17.5 19 Z" fill="${CR}" stroke="none"/>` +
    `<path d="M12.5 20 Q11.5 18.5 12.5 17.5 Q13.5 19 12.5 20 Z" fill="${CR}" stroke="none"/>`,

  "cup":
    `<path d="M9 10 H23 L21.4 22.5 Q16 24 10.6 22.5 Z" fill="${CR}"/>` +
    `<path d="M7.5 10 H24.5" stroke-width="1.7"/>` +
    `<path d="M23 13.5 Q27 13 27 16 Q27 19.5 23 19" stroke-width="1.5"/>` +
    `<path d="M12.6 14.5 Q13.8 12 15 14.5 Q16.2 17 17.4 14.5" stroke-width="1.3"/>`,

  "envelope":
    `<rect x="5" y="9" width="22" height="15" rx="3" fill="${CR}"/>` +
    `<path d="M5 11 L16 18 L27 11"/>`,

  "gift":
    `<rect x="7" y="13" width="18" height="13" rx="2.5" fill="${PK}"/>` +
    `<rect x="6" y="10" width="20" height="4" rx="2" fill="${CR}"/>` +
    `<path d="M16 10 V26"/>` +
    `<path d="M16 10 Q13 6 10 8 Q9 10 11 10 Q13 10 16 10 Z" fill="${SG}"/>` +
    `<path d="M16 10 Q19 6 22 8 Q23 10 21 10 Q19 10 16 10 Z" fill="${SG}"/>`,

  "heart":
    `<path d="M16 23 Q8 17 8 12 Q8 7.5 12 7.5 Q14 7.5 16 10 Q18 7.5 20 7.5 Q24 7.5 24 12 Q24 17 16 23 Z" fill="${PK}"/>`,

  "pencil":
    `<path d="M8 22 L10 16 L20 6 L26 12 L16 22 Z" fill="${BT}"/>` +
    `<path d="M10 16 L16 22"/>` +
    `<path d="M20 6 L26 12"/>` +
    `<path d="M8 22 L10 16 L11.6 17.6 Z" fill="${CR}"/>`,

  "pin":
    `<circle cx="16" cy="13" r="6" fill="${PK}"/>` +
    `<path d="M16 19 V27"/>` +
    `<circle cx="16" cy="13" r="2.2" fill="${CR}" stroke="none"/>`,

  "sparkle":
    `<path d="M16 5 L17.2 13 L25 16 L17.2 19 L16 27 L14.8 19 L7 16 L14.8 13 Z" fill="${BT}"/>` +
    `<path d="M24 7 L24.6 10 L27.5 11 L24.6 12 L24 15 L23.4 12 L20.5 11 L23.4 10 Z" fill="${PK}"/>`,

  "wallet":
    `<rect x="5" y="9" width="22" height="16" rx="3.5" fill="${CR}"/>` +
    `<path d="M5 14 H27"/>` +
    `<rect x="19" y="16" width="8" height="5.5" rx="2" fill="${SG}"/>` +
    `<circle cx="22.8" cy="18.8" r="1.1" fill="${CR}" stroke="none"/>`,

  "bag":
    `<path d="M8 13 H24 L22 25 H10 Z" fill="${CR}"/>` +
    `<path d="M11 13 Q11 8 16 8 Q21 8 21 13"/>` +
    `<path d="M12.5 13 Q12.5 10 16 10 Q19.5 10 19.5 13" stroke-width="1.2"/>`,

  "bus":
    `<rect x="5" y="7" width="22" height="16" rx="4" fill="${BL}"/>` +
    `<path d="M5 14 H27"/>` +
    `<rect x="7.5" y="9" width="7" height="4" rx="1.5" fill="${CR}"/>` +
    `<rect x="17.5" y="9" width="7" height="4" rx="1.5" fill="${CR}"/>` +
    `<circle cx="9.5" cy="25" r="2.2" fill="${CR}"/>` +
    `<circle cx="22.5" cy="25" r="2.2" fill="${CR}"/>`,

  "bowl":
    `<path d="M6 15 Q6 24 16 24 Q26 24 26 15 Z" fill="${CR}"/>` +
    `<path d="M5 15 H27"/>` +
    `<path d="M12 9 Q10 12 12 13 Q14 14 14 11 Q16 14 18 11 Q18 14 20 13 Q22 12 20 9" stroke-width="1.5"/>`,

  "clock":
    `<circle cx="16" cy="16" r="10" fill="${CR}"/>` +
    `<path d="M16 9 V16 L20.5 20.5" stroke-width="1.8"/>` +
    `<circle cx="16" cy="16" r="1.4" fill="${PK}" stroke="none"/>`,

  "wifi":
    `<path d="M4 13 Q16 2 28 13" stroke-width="1.8"/>` +
    `<path d="M7.5 17 Q16 9 24.5 17" stroke-width="1.8"/>` +
    `<path d="M11.5 21 Q16 16.5 20.5 21" stroke-width="1.8"/>` +
    `<circle cx="16" cy="24" r="1.8" fill="${PK}" stroke="none"/>`,

  "battery":
    `<rect x="2" y="10" width="24" height="12" rx="3" fill="${CR}"/>` +
    `<rect x="4" y="12.5" width="14" height="7" rx="1.5" fill="${SG}" stroke="none"/>` +
    `<path d="M26 13.5 V18.5 Q28.5 18 28.5 16 Q28.5 14 26 13.5 Z" fill="${SG}" stroke="none"/>`,
};

// ─── Componente ───────────────────────────────────────────────

interface PmIconProps {
  name: keyof typeof ICONS;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PmIcon({ name, size = 24, className = "", style }: PmIconProps) {
  const paths = ICONS[name];

  if (!paths) {
    console.warn(`[PmIcon] Ícono "${name}" no encontrado.`);
    return null;
  }

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}

export { ICONS };