// app/page-home.tsx (Next.js 13+) or pages/page-home.tsx (Next.js 12)
// Hardcoded TSX conversion of page-home.php
import React from "react";

export default function PageHome() {
  return (
    <div className="bg-gray-400 overflow-x-hidden">
      {/* Hero Section */}
      <div className="home-hero relative">
        {/* Background Image */}
        <div>
          <img
            src="/assets/images/patterns/home-hero-bg.jpg"
            width="1628"
            height="700"
            className="h-full w-full object-cover"
            alt="about-hero-img.jpg"
          />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(235, 26, 82, 0.20) 0%, rgba(235, 26, 82, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%)",
          }}
        ></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="hero-block-container mx-auto">
            <div className="hero-block-center">
              <h1 className="hero-title">Connecting the dots on Public Data</h1>
              <div className="space-y-2.5">
                <p className="hero-paragraph">
                  Powered by Advocata’s cutting-edge AI, our platform leverages
                  advanced data insights to help you connect with people who
                  share your values and interests.
                </p>
              </div>
              {/* Search Form */}
              <div className="mt-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    className="search-input"
                  />
                  <div className="search-icon">
                    <svg
                      className="text-slate-50"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9.58332 17.5C13.9556 17.5 17.5 13.9556 17.5 9.58333C17.5 5.21108 13.9556 1.66667 9.58332 1.66667C5.21107 1.66667 1.66666 5.21108 1.66666 9.58333C1.66666 13.9556 5.21107 17.5 9.58332 17.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.3333 18.3333L16.6667 16.6667"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Search button */}
                  <button type="submit" className="search-btn btn">
                    <span className="hidden md:block">Search</span>
                    <span className="block md:hidden">
                      <svg
                        className="size-6 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 22L20 20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-white pb-0">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="ring-1 ring-black/10 rounded-3xl relative -top-32 md:-top-40 xl:-top-48 z-20">
            <img
              src="/assets/images/home-img.jpg"
              className="rounded-3xl h-full w-full object-cover"
              width="1120"
              height="713"
              loading="lazy"
              alt="Home Image"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="bg-white pb-24 sm:pb-32 -mt-18">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="page-sub-title">dashboard</span>
            <h2 className="page-title">Explore Our advance dashboards</h2>
            <div className="page-title-text">
              <p>
                Powered by Advocata’s cutting-edge AI, our platform leverages
                advanced data insights to help you connect with people who share
                your values and interests.
              </p>
            </div>
          </div>
          {/* cards grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:gap-8 xl:gap-10 sm:mt-16 xl:grid-cols-7 xl:grid-rows-2">
            {/* Card 1 */}
            <div className="flex p-px xl:col-span-4">
              <a href="#">
                <div className="card card-type-1">
                  <div className="card-body">
                    <div className="mt-1 block max-w-2xl">
                      <h2>The Macro Economy of Sri Lanka</h2>
                      <p>
                        Transparency in government institutions refers to the
                        open and accessible sharing of information about
                        financial activities.
                      </p>
                    </div>
                    <div className="card-btn">
                      <button className="btn btn-white py-2.5">
                        Learn more
                        <svg
                          className="btn-arrow-icon"
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
                  <div className="flex-shrink-0 h-auto">
                    <img
                      className="card-img w-full h-full object-cover"
                      src="/assets/images/card-imgs/card-img-1.jpg"
                      width="300"
                      height="200"
                      alt="card-type-1 img"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
            </div>

            {/* More cards here... */}
          </div>
        </div>
      </div>

      {/* AI Section */}
      <div
        className="relative overflow-hidden bg-white py-24 sm:py-32"
        style={{
          background:
            "url('/assets/images/patterns/home-page-bg.jpg') no-repeat center/cover",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto grid max-w-2xl grid-cols-1 lg:grid-cols-2 gap-y-16 sm:gap-y-20">
            <div className="lg:pt-4 lg:pr-4">
              <span className="text-xs font-semibold text-white bg-white/25 py-2 px-3 rounded-full uppercase">
                advanced AI
              </span>
              <h2 className="mt-5 xl:text-6xl sm:text-5xl text-3xl leading-9 text-white">
                Discover meaningful connections with the power of Advocata's
                advanced AI technology.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Section */}
      <div className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="page-sub-title">Datasets</span>
            <h2 className="page-title">
              Explore Our <br /> <span>Comprehensive Dataset</span> <br />{" "}
              Collection
            </h2>
          </div>

          <div className="mx-auto my-8 md:my-11 grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Dataset card example */}
            <div className="card card-type-6 h-full">
              <div className="card-body">
                <div className="flex-1">
                  <h2>Pre-Trained Model</h2>
                  <p>
                    By comparison, just before the nation’s independence nearly
                    250 years ago.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="date-info">
                    <div className="pdf-btn">
                      <span>csv,json,xml,excel</span>
                    </div>
                    <time>2024-08-18</time>
                  </div>
                </div>
              </div>
            </div>
            {/* more dataset cards... */}
          </div>

          <div className="mx-auto max-w-7xl text-center">
            <button className="btn btn-primary">View data catalog</button>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-pink-100 py-12 md:py-16 xl:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="page-sub-title">Highlights</span>
            <h2 className="page-title">
              Up to date with our latest news and updates
            </h2>
          </div>

          <div className="mx-auto my-8 md:my-11 grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Insight card */}
            <div className="card card-type-5 h-full">
              <div>
                <img
                  className="card-img"
                  src="/assets/images/card-imgs/card-img-5.jpg"
                  alt="card-type-5 img"
                  width="100"
                  height="100"
                  loading="lazy"
                />
              </div>
              <div className="card-body">
                <span className="card-category">economy</span>
                <h2>
                  New research shows 70% of young people with long Covid recover
                  within.
                </h2>
                <p>
                  Body text for whatever you’d like to say. Add main takeaway
                  points, quotes, anecdotes, or even a very very short story.
                </p>
                <div className="card-footer">
                  <time dateTime="2025-08-24">24th August 2025</time>
                </div>
              </div>
            </div>
            {/* more insights... */}
          </div>

          <div className="mx-auto max-w-7xl text-center">
            <button className="btn btn-primary">Explore more</button>
          </div>
        </div>
      </div>
    </div>
  );
}
