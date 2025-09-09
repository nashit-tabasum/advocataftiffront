"use client";

import searchClient from "@/src/lib/algolia";
import { type JSX, FormEvent, useState, useEffect } from "react";

export default function SearchFieldHome(): JSX.Element {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  function preventSubmit(e: FormEvent) {
    e.preventDefault();
  }

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { hits } = await searchClient.searchSingleIndex({
          indexName: "wp_searchsearchable_posts",
          searchParams: { query, hitsPerPage: 5 },
        });
        setResults(hits as any[]);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full">
      <form className="relative w-full" onSubmit={preventSubmit}>
        {/* Your input and button markup remains unchanged */}
        <input
          type="text"
          id="search-home"
          name="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input py-5 bg-brand-black text-slate-50/70 font-family-sourcecodepro border-white w-full rounded-full border pl-12 pr-28 font-family-sourcecodepro text-sm md:text-base placeholder:text-brand-white/90 shadow-sm focus:border-brand-1-200 focus:outline-0 focus:ring-1 focus:ring-transparent shadow-[0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px #9B195F] transition-all duration-500 ease-in-out"
        />
        <div className="search-icon text-slate-50 absolute left-3 top-1/2 -translate-y-1/2">
          <svg
            className="size-5 text-slate-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
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
        <button
          type="submit"
          className="search-btn absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-3 rounded-full bg-brand-white text-gray-600 border-slate-400 hover:bg-brand-1-600 hover:text-brand-white placeholder:text-brand-white/90 inline-flex items-center justify-center sm:px-3.5 sm:py-2.5 md:px-4 md:py-3 lg:py-3.5 xl:px-6 xl:py-3.5 text-xs/4 sm:text-sm/tight lg:text-base/6 font-family-sourcecodepro font-medium gap-2 lg:gap-3 transition-all duration-500 ease-in-out cursor-pointer uppercase"
        >
          <span className="hidden md:block">Search</span>
          <span className="block md:hidden">
            <svg
              className="size-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </form>

      {results.length > 0 && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-50">
          {results.map((hit) => (
            <li
              key={hit.objectID}
              className="p-3 border-b border-gray-200 hover:bg-gray-100"
            >
              <a href={hit.permalink} className="block text-gray-800">
                <strong>{hit.post_title}</strong>
                <p className="text-sm text-gray-500">{hit.post_excerpt}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
