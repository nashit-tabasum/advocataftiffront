"use client";

import { FormEvent, useState, type JSX } from "react";

export default function InputsAndNav(): JSX.Element {
  // Segmented control active tabs (two groups in your template)
  const [activeTabG1, setActiveTabG1] = useState<"search" | "ai">("ai");
  const [activeTabG2, setActiveTabG2] = useState<"search" | "ai">("ai");

  // (Optional) prevent form submits if you later wrap inputs in a form
  function preventSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="w-full mb-16">
      <div className="block mt-4">
        <nav className="flex space-x-2 w-fit px-0.5 py-1" aria-label="Tabs">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTabG1("search");
            }}
            aria-current={activeTabG1 === "search" ? "page" : undefined}
            className={[
              "segmented-item rounded-full px-3 py-1.5 text-xs font-normal",
              activeTabG1 === "search"
                ? "segmented-item-active bg-brand-2-500 text-brand-white"
                : "text-brand-white",
            ].join(" ")}
          >
            Search
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTabG1("ai");
            }}
            aria-current={activeTabG1 === "ai" ? "page" : undefined}
            className={[
              "segmented-item rounded-full px-3 py-1.5 text-xs font-normal",
              activeTabG1 === "ai"
                ? "segmented-item-active bg-brand-2-500 text-brand-white"
                : "text-brand-white",
            ].join(" ")}
          >
            AI Mode
          </a>
        </nav>
      </div>
    </div>
  );
}
