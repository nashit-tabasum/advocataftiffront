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
    <div className="w-full">
      <div className="block mt-4">
        <nav
          className="flex space-x-2 w-fit p-1 bg-brand-black rounded-full"
          aria-label="Tabs"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTabG2("ai");
            }}
            aria-current={activeTabG2 === "ai" ? "page" : undefined}
            className={[
              "segmented-item rounded-full px-3 py-1.5 text-xs font-normal",
              activeTabG2 === "ai"
                ? "segmented-item-active bg-brand-2-500 text-brand-white"
                : "text-brand-white",
            ].join(" ")}
          >
            AI Mode
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTabG2("search");
            }}
            aria-current={activeTabG2 === "search" ? "page" : undefined}
            className={[
              "segmented-item rounded-full px-3 py-1.5 text-xs font-normal",
              activeTabG2 === "search"
                ? "segmented-item-active bg-brand-2-500 text-brand-white"
                : "text-brand-white",
            ].join(" ")}
          >
            Search
          </a>
        </nav>
      </div>
    </div>
  );
}
