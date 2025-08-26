import React from "react";

const CardType8: React.FC = () => {
  return (
    <div className="my-20">
      <a
        href="#"
        className="relative block rounded-xl bg-white border border-gray-300 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 ease-in-out"
      >
        <div className="flex flex-1 flex-col justify-between bg-white p-5">
          <div className="flex-1">
            <span className="text-xs font-medium font-family-sourcecodepro text-slate-800">
              Statistical release 28 September 2023
            </span>
            <h2 className="mt-1 text-2xl leading-snug font-semibold font-family-montserrat text-slate-800">
              Digital Health Maturity Data 2023
            </h2>
            <p className="mt-2 text-base font-normal font-family-sourcecodepro text-slate-950">
              Download Country-Level Digital Health Indicators for Analysis and
              Reporting
            </p>
          </div>

          <div className="md:absolute md:right-5 top-[30%] -translate-y-[30%] md:top-[35%] md:-translate-y-[35%]">
            <svg
              className="mt-6 md:mt-0 size-7 text-zinc-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M21 15.5V19.5C21 20.0304 20.7893 20.5391 20.4142 20.9142C20.0391 21.2893 19.5304 21.5 19 21.5H5C4.46957 21.5 3.96086 21.2893 3.58579 20.9142C3.21071 20.5391 3 20.0304 3 19.5V15.5M7 10.5L12 15.5M12 15.5L17 10.5M12 15.5V3.5"
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

export default CardType8;
