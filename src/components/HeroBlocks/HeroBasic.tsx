"use client";
import type { JSX } from "react";

type HeroBasicProps = {
  bgUrl?: string;
};

export default function HeroBasic({
  bgUrl = "/assets/images/hero-basic-bg.jpg",
}: HeroBasicProps): JSX.Element {
  return (
    <section
      className="hero-block-container hero-basic px-5 md:px-10 xl:px-16 py-12 md:py-16 xl:py-20"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="hero-block text-start mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <h1 className="hero-title mb-5 md:mb-0 text-slate-50 text-4xl md:text-5xl xl:text-6xl leading-snug font-family-montserrat font-bold max-w-5 xl:max-w-sm">
          Research Datasets
        </h1>
        <div className="space-y-2.5">
          <p className="hero-paragraph text-slate-200 text-base/6 lg:text-lg/7 font-family-baskervville font-normal max-w-2xl">
            A dataset is a structured collection of data that is organized and
            stored for analysis, processing, or reference. Datasets typically
            consist of related data points grouped into tables, files, or
            arrays, making it easier to work with them in research, analytics,
            or machine learning.
          </p>
        </div>
      </div>
    </section>
  );
}
