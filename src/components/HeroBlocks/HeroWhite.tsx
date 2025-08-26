"use client";
import type { JSX } from "react";
import Breadcrumb from "../Breadcrumb";

export default function HeroWhite(): JSX.Element {
  return (
    <section className="hero-block-container hero-white bg-white px-5 md:px-10 xl:px-16 py-12 md:py-16 xl:py-20">
      <div className="hero-block text-start mx-auto max-w-6xl">
        <div className="mb-5">
          <Breadcrumb items={[{ label: "Datasets", href: "#" }]} />
        </div>

        <h1 className="hero-title mb-5 text-slate-950 text-4xl md:text-5xl xl:text-6xl leading-snug font-family-montserrat font-bold max-w-lg xl:max-w-3xl">
          Sri Lanka - Food Security and Nutrition Indicators
        </h1>
        <div className="space-y-2.5">
          <p className="hero-paragraph text-slate-800 text-base/6 lg:text-lg/7 font-family-baskervville font-normal max-w-2xl">
            Infrastructure helps determine the success of manufacturing and
            agricultural activities. Investments in water, sanitation, energy,
            housing, and transport also improve lives and help reduce poverty.
            And new information and communication technologies promote growth,
            improve delivery of health and other services, expand the reach of
            education, and support social and cultural advances. Data here are
            compiled from such sources as the International Road Federation,
            Containerisation International, the International Civil Aviation
            Organization, the International Energy Association, and the
            International Telecommunications Union.
          </p>
        </div>
      </div>
    </section>
  );
}
