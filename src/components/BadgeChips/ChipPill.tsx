"use client";
import type { JSX, ReactNode } from "react";

type ChipPillProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

export default function ChipPill({
  children,
  href = "#",
  className = "",
}: ChipPillProps): JSX.Element {
  return (
    <a
      href={href}
      className={[
        // base .chip styles
        "text-sm/tight xl:text-base/6 font-normal font-family-sourcecodepro text-slate-800 bg-transparent",
        "hover:bg-brand-1-50 hover:border hover:border-brand-1-700",
        "focus:text-slate-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-transparent",
        // .chip-pill specifics
        "py-2 px-3.5 md:py-2 md:px-6 rounded-full border border-transparent",
        "focus:border-brand-1-800 focus:bg-brand-1-800",
        // ensure pill layout is consistent
        "inline-flex items-center justify-center",
        // custom utility hooks
        "chip chip-pill chip-pressed",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}
