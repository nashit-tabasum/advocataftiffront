"use client";
import type { JSX, ReactNode } from "react";

type ChipBoxProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

export default function ChipBox({
  children,
  href = "#",
  className = "",
}: ChipBoxProps): JSX.Element {
  return (
    <a
      href={href}
      className={[
        // base .chip styles
        "text-sm/tight xl:text-base/6 font-normal font-family-sourcecodepro text-slate-800 bg-transparent",
        "hover:bg-brand-1-50 hover:border hover:border-brand-1-700",
        "focus:text-slate-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-transparent",
        // .chip-box specifics
        "py-1 px-5 md:py-1 md:px-6 rounded-lg border border-gray-400",
        "focus:border-brand-1-950 focus:bg-brand-1-950",
        // layout
        "inline-flex items-center justify-center",
        // custom utility hooks
        "chip chip-box chip-pressed",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}
