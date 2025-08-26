import React from "react";

export default function BasicButtonGroup() {
  return (
    <div className="isolate relative inline-flex items-center rounded-md shadow-xs leading-tight">
      <button
        type="button"
        className="rounded-l-md bg-brand-white px-4 py-2.5 text-sm leading-tight font-medium text-gray-800 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        Years
      </button>
      <button
        type="button"
        className="-ml-px bg-brand-white px-4 py-2.5 text-sm leading-tight font-medium text-gray-800 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        Months
      </button>
      <button
        type="button"
        className="-ml-px rounded-r-md bg-brand-white px-4 py-2.5 text-sm leading-tight font-medium text-gray-800 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        Days
      </button>
    </div>
  );
}
