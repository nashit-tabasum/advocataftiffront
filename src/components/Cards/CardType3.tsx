import React from "react";

const CardType3: React.FC = () => {
  return (
    <div className="my-20">
      <a href="#" className="group">
        <div className="relative flex flex-col h-full overflow-hidden transition-all duration-500 ease-in-out cursor-pointer rounded-lg border border-slate-400 text-slate-50 bg-brand-black hover:border-slate-200 hover:shadow-lg hover:-translate-y-1.5">
          <div className="flex flex-col justify-between xl:px-12 xl:pt-12 md:px-9 md:pt-9 px-6 pt-6">
            <div className="flex-1">
              <div className="mt-1 block max-w-2xl">
                <h2 className="text-2xl md:text-3xl xl:text-4xl leading-snug font-bold font-family-montserrat pb-2">
                  Transparency in government institutions
                </h2>
                <p className="text-base/6 font-normal font-family-sourcecodepro">
                  Transparency in government institutions refers to the open and
                  accessible sharing of information about financial activities.
                </p>
              </div>
            </div>

            <div className="mt-4 mb-7 font-semibold font-family-sourcecodepro">
              <button className="btn btn-white py-2.5 inline-flex items-center gap-2">
                Learn more
                <svg
                  className="text-gray-600 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.025 4.94165L17.0833 9.99998L12.025 15.0583"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.91667 10H16.9417"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-shrink-0">
            <img
              className="relative w-full h-full object-cover rounded-xl xl:left-12 md:left-9 left-6 top-4"
              src="/assets/images/card-imgs/card-img-3.jpg"
              width={300}
              height={200}
              alt="card-type-3 img"
              loading="lazy"
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardType3;
