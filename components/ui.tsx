import { BadgeCheck, GraduationCap, ShieldCheck } from "lucide-react";
import type { ServiceIcon } from "@/lib/site";

export function ServiceGlyph({ icon, size = 28 }: { icon: ServiceIcon; size?: number }) {
  const p = { size, strokeWidth: 1.7 };
  if (icon === "training") return <GraduationCap {...p} />;
  if (icon === "cyber") return <ShieldCheck {...p} />;
  return <BadgeCheck {...p} />;
}

/** Subtle hexagon lattice echoing the logo's shape. */
export function HexPattern() {
  return (
    <svg className="hero-pattern" aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id="hex" width="28" height="49" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <path
            d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z"
            fill="rgba(232,199,102,.16)"
            fillRule="evenodd"
          />
        </pattern>
        <linearGradient id="hexfade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="hexmask">
          <rect width="100%" height="100%" fill="url(#hexfade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" mask="url(#hexmask)" />
    </svg>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
  center,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`section-head${center ? " center" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      <div className="rule" />
      {children && <p>{children}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
  crumbs,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  crumbs?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <HexPattern />
      <div className="container" style={{ position: "relative" }}>
        {crumbs && <div className="crumbs">{crumbs}</div>}
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  );
}
