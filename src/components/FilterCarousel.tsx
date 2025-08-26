"use client";
import React, { useState } from "react";

const categories = [
  "Provincial Councils",
  "All datasets",
  "Management",
  "Budget",
  "Financing",
  "Direction",
  "Expenditure",
  "Revenue",
  "Debt",
  "Provincial Councils",
];

const FilterCarousel: React.FC = () => {
  const [active, setActive] = useState("Management");
  const [startIndex, setStartIndex] = useState(0);

  // Items per screen depending on viewport
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 9;
    if (window.innerWidth >= 768) return 7;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const endIndex = startIndex + visibleCount;
  const visibleItems = categories.slice(startIndex, endIndex);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(categories.length - visibleCount, prev + 1)
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-black text-center py-10 mb-14 border-b border-b-black">
        Filter Carousel
      </h1>

      <div className="flex justify-center items-center w-full px-6 relative">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full backdrop-blur-sm py-1 xl:py-2 text-brand-1-900 pl-0 pr-2 xl:pl-0 xl:pr-3.5 disabled:opacity-40"
          style={{
            background:
              "linear-gradient(270deg, var(--Core-Gray-100, #F3F4F6) 0%, var(--Core-Neutral-White, #FFF) 60%)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.26 15.53L9.74 12L13.26 8.47"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Slider */}
        <div className="flex justify-center gap-2 w-full overflow-hidden">
          {visibleItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActive(item)}
              className={`px-3 py-2 md:px-4 rounded-full text-slate-800 text-sm/snug xl:text-base/6 font-normal font-family-baskervville uppercase transition-colors duration-300 hover:bg-brand-1-50 hover:border hover:border-brand-1-900 ${
                active === item
                  ? "bg-brand-1-500 text-slate-50 hover:text-slate-800"
                  : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={startIndex >= categories.length - visibleCount}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full backdrop-blur-sm py-1 xl:py-2 text-brand-1-900 pr-0 pl-2 xl:pr-0 xl:pl-3.5 disabled:opacity-40"
          style={{
            background:
              "linear-gradient(270deg, var(--Core-Neutral-White, #FFF) 40%, var(--Core-Gray-100, #F3F4F6) 100%)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.74 15.53L14.26 12L10.74 8.47"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilterCarousel;
