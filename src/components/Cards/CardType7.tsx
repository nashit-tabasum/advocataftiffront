import React from "react";

const CardType7: React.FC = () => {
  return (
    <div className="my-20">
      <a
        href="#"
        className="relative block rounded-xl bg-white border border-slate-400 hover:shadow-lg hover:-translate-y-1.5"
      >
        <div className="flex flex-col bg-white p-5">
          <h2 className="text-2xl font-semibold font-family-montserrat text-slate-800">
            PDF
          </h2>
          <p className="mt-2 text-sm font-family-sourcecodepro text-slate-950">
            You can access your file via PDF
          </p>

          <div className="absolute right-5 top-[30%] md:top-[35%]">
            <svg
              className="size-6 text-slate-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M21 15.5V19.5C21 20.03 20.79 20.54 20.41 20.91C20.04 21.29 19.53 21.5 19 21.5H5C4.47 21.5 3.96 21.29 3.59 20.91C3.21 20.54 3 20.03 3 19.5V15.5M7 10.5L12 15.5L17 10.5M12 15.5V3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardType7;
