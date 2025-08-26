import { useState, useRef, useEffect } from "react";

export default function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((s) => !s)}
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-brand-white px-4 py-2 text-sm font-family-baskervville font-normal text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        Options
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
          className="-mr-1 size-5 text-gray-700"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 md:w-64 origin-top-right rounded-md bg-brand-white shadow-lg ring-1 ring-black/5">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2.5 text-sm/tight text-gray-700 hover:bg-gray-100"
            >
              Account settings
            </a>
            <a
              href="#"
              className="block px-4 py-2.5 text-sm/tight text-gray-700 hover:bg-gray-100"
            >
              Support
            </a>
            <a
              href="#"
              className="block px-4 py-2.5 text-sm/tight text-gray-700 hover:bg-gray-100"
            >
              License
            </a>
            <button
              type="button"
              className="w-full text-left block px-4 py-2.5 text-sm/tight text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
