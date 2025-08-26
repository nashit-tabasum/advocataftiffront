import React from "react";
import LoadingIcon from "../../../public/assets/images/card-imgs/download-loading-icon.png";

const CardType7Loading: React.FC = () => {
  return (
    <div className="my-20">
      <a
        href="#"
        className="relative block rounded-xl bg-white border border-slate-400 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 ease-in-out"
      >
        <div className="flex flex-1 flex-col justify-between bg-white p-5">
          <div className="flex-1">
            <h2 className="text-2xl leading-snug font-semibold font-family-montserrat text-slate-800">
              PDF
            </h2>
            <p className="mt-2 text-sm leading-tight font-normal font-family-sourcecodepro text-slate-950">
              You can access your file via PDF
            </p>
          </div>

          <div className="absolute right-5 top-[30%] -translate-y-[30%] md:top-[35%] md:-translate-y-[35%]">
            <img
              className="size-6"
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

export default CardType7Loading;
