import React from "react";

const CardType6: React.FC = () => {
  return (
    <div className="my-20">
      <a
        href="#"
        className="rounded-lg bg-white border border-slate-300 hover:shadow-lg hover:-translate-y-1.5"
      >
        <div className="flex flex-col bg-white px-6 py-5">
          <h2 className="mt-2 text-2xl font-semibold font-family-montserrat text-slate-800">
            Pre-Trained Model
          </h2>
          <p className="mt-2 text-base font-family-sourcecodepro text-slate-600 line-clamp-3">
            By comparison, just before the nation’s independence nearly 250
            years ago, the 13 colonies had about 2.5 million residents...
          </p>

          <div className="mt-6 flex justify-between items-center text-sm font-family-sourcecodepro text-slate-600">
            <div className="flex items-center space-x-1.5">
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9.04 17.59h5.93c.19 0 .35-.07.49-.21.14-.14.21-.3.21-.48 0-.19-.07-.35-.21-.49a.68.68 0 00-.49-.2H9.04c-.19 0-.35.07-.49.2a.68.68 0 00-.21.49c0 .18.07.34.21.48.14.14.3.21.49.21z" />
              </svg>
              <span>csv,json,xml,excel</span>
            </div>
            <time className="text-xs">2024-08-18</time>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardType6;
