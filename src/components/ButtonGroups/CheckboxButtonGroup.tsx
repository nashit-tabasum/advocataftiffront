import React from "react";

export default function CheckboxDropdownButton() {
  return (
    <div className="inline-flex">
      <div className="relative inline-flex items-center justify-center rounded-l-md bg-brand-white px-3 py-2 ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
        <input
          type="checkbox"
          name="select-all"
          aria-label="Select all"
          className="size-4 appearance-none rounded border border-gray-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none"
        />
      </div>

      <div className="-ml-px grid grid-cols-1">
        <select
          id="message-type"
          name="message-type"
          aria-label="Select message type"
          className="col-start-1 row-start-1 w-full rounded-r-md bg-brand-white py-2 pr-8 pl-3 text-sm text-slate-800 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-none appearance-none"
          defaultValue="Unread messages"
        >
          <option>Unread messages</option>
          <option>Sent messages</option>
          <option>All messages</option>
        </select>

        <svg
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29288 7.29289C5.6834 6.90237 6.31657 6.90237 6.70709 7.29289L9.99998 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.6834 13.0976 9.29287 12.7071L5.29288 8.70711C4.90235 8.31658 4.90235 7.68342 5.29288 7.29289Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
