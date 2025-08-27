"use client";

import { type JSX, useCallback, useMemo, useState } from "react";

type SearchFieldProps = {
  value?: string; // controlled value
  defaultValue?: string; // for uncontrolled usage
  onChange?: (query: string) => void; // fires on each keystroke
  onSubmit?: (query: string) => void; // fires on Enter or submit
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
};

export default function SearchField({
  value,
  defaultValue,
  onChange,
  onSubmit,
  placeholder = "Search...",
  className,
  autoFocus,
}: SearchFieldProps): JSX.Element {
  const isControlled = useMemo(() => typeof value === "string", [value]);
  const [internal, setInternal] = useState<string>(defaultValue ?? "");
  const query = isControlled ? (value as string) : internal;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      if (!isControlled) setInternal(next);
      if (onChange) onChange(next);
    },
    [isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSubmit) onSubmit(query);
    },
    [onSubmit, query]
  );

  const handleBlur = useCallback(() => {
    // Optional: trigger submit on blur if desired; keeping noop by default
  }, []);

  return (
    <div className={"relative w-full " + (className || "")}>
      <input
        type="text"
        id="search-plain"
        name="search"
        placeholder={placeholder}
        className="search-input w-full rounded-full border border-gray-300 bg-white py-2.5 pl-12 pr-2.5 font-family-baskervville text-sm md:text-base text-slate-800 placeholder:text-slate-600/50 shadow-sm hover:border-brand-1-100 focus:border-brand-1-200 focus:outline-0 focus:ring-1 focus:ring-transparent"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoFocus={autoFocus}
        aria-label="Search"
        role="searchbox"
      />
      <div className="search-icon pointer-events-none absolute inset-y-0 left-2 flex items-center pl-2 text-slate-600/80">
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9.583 17.5A7.917 7.917 0 1 0 1.667 9.583 7.917 7.917 0 0 0 9.583 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m18.333 18.333-1.667-1.667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
