import React from "react";

const CardType5: React.FC = () => {
  return (
    <div className="mt-20">
      <a
        href="#"
        className="relative flex h-full overflow-hidden rounded-lg border border-gray-300 hover:-translate-y-1.5 hover:shadow-[0_0_40px_0_rgba(79,8,46,0.40)]"
      >
        <div>
          <img
            className="shrink-0 w-full h-64 object-cover aspect-[4/3]"
            src="/assets/images/card-imgs/card-img-5.jpg"
            alt="card-type-5 img"
            width={100}
            height={100}
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white p-8 pb-7">
          <div className="flex-1">
            <span className="text-sm font-family-sourcecodepro text-slate-800 uppercase pb-1 group-hover:border-brand-1-500">
              economy
            </span>
            <h2 className="mt-3 text-xl md:text-2xl font-semibold font-family-montserrat text-slate-950 line-clamp-3">
              New research shows 70% of young people with long Covid recover
              within.
            </h2>
            <p className="mt-3 text-base font-family-sourcecodepro text-slate-600 line-clamp-3">
              Body text for whatever you’d like to say. Add main takeaway
              points, quotes, anecdotes, or even a short story.
            </p>
          </div>

          <div className="mt-9 flex items-center justify-between">
            <div className="flex justify-between w-full items-center space-x-1 text-xs font-family-sourcecodepro text-slate-600">
              <div className="flex items-center space-x-1.5 text-sm">
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9.04 17.59h5.93c.19 0 .35-.07.49-.21.14-.14.21-.3.21-.48 0-.19-.07-.35-.21-.49a.68.68 0 00-.49-.2H9.04c-.19 0-.35.07-.49.2a.68.68 0 00-.21.49c0 .18.07.34.21.48.14.14.3.21.49.21zm0-3.96h5.93c.19 0 .35-.07.49-.21.14-.14.21-.3.21-.48 0-.19-.07-.35-.21-.49a.68.68 0 00-.49-.2H9.04c-.19 0-.35.07-.49.2a.68.68 0 00-.21.49c0 .18.07.34.21.48.14.14.3.21.49.21z" />
                </svg>
                <span>csv,json,xml,excel</span>
              </div>
              <time
                className="text-xs font-family-baskervville text-slate-600"
                dateTime="2025-08-24"
              >
                24th August 2025
              </time>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardType5;
