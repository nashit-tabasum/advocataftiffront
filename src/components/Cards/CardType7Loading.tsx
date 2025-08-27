import React from "react";
import LoadingIcon from "../../../public/assets/images/card-imgs/download-loading-icon.png";

const CardType7Loading: React.FC = () => {
  return (
    <div className="my-20">
      <a
        href="#"
        className="relative block rounded-xl overflow-hidden 
             bg-white border border-slate-400 
             transition-all duration-500 ease-in-out cursor-pointer
             hover:border-gray-300 hover:shadow-lg hover:-translate-y-1.5 
             focus:border-brand-2-100 focus:shadow-inner-lg"
      >
        <div className="flex flex-col p-5">
          <h2 className="text-2xl font-semibold font-family-montserrat text-slate-800">
            PDF
          </h2>
          <p className="mt-2 text-sm font-family-sourcecodepro text-slate-950">
            You can access your file via PDF
          </p>

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
