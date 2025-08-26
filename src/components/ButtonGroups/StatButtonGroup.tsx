import React from "react";

export default function StatButtonGroup() {
  return (
    <div className="isolate relative inline-flex items-center rounded-md shadow-xs leading-tight">
      <button
        type="button"
        className="rounded-l-md relative inline-flex items-center gap-x-1.5 bg-brand-white px-4 py-2.5 text-sm font-medium text-gray-800 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          className="-ml-0.5 size-5 text-gray-400"
        >
          <path
            d="M5 4C5 2.89543 5.89543 2 7 2H13C14.1046 2 15 2.89543 15 4V18L10 15.5L5 18V4Z"
            fill="currentColor"
          />
        </svg>
        Bookmark
      </button>
      <button
        type="button"
        className="-ml-px rounded-r-md bg-brand-white px-4 py-[9px] text-sm font-medium text-gray-800 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        12k
      </button>
    </div>
  );
}
