import React from "react";
import LoadingIcon from "../../../public/assets/images/card-imgs/download-loading-icon.png";

const CardType8Loading: React.FC = () => {
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
            <img
              className="mt-6 md:mt-0 size-7"
              src={LoadingIcon.src}
              alt="Download Loading Icon"
              width={24}
              height={24}
              loading="lazy"
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardType8Loading;
