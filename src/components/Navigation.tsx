"use client";

import { useState, type JSX } from "react";

export default function Navigation(): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchDesktopOpen, setSearchDesktopOpen] = useState(false);
  const [searchMobileOpen, setSearchMobileOpen] = useState(false);

  return (
    <header className="navbar bg-brand-black relative z-30">
      <div className="max-w-full mx-auto px-6 lg:px-8 flex items-center justify-between py-3 lg:py-3">
        {/* Logo */}
        <a
          href="#"
          className="brand-logo text-2xl leading-snug font-bold text-gray-800 w-full sm:w-40 md:w-52 lg:w-64"
        >
          <div className="flex space-x-3 text-white text-xs lg:text-sm font-normal font-family-inter items-center">
            <span>
              <img
                src="/assets/images/logos/brand-logo.svg"
                alt="brand-logo"
                height={44}
                width={107}
              />
            </span>
          </div>
        </a>

        <div className="flex items-center gap-10">
          {/* Desktop Navigation */}
          <nav className="nav hidden lg:flex items-center space-x-2">
            <a
              href="#"
              className="nav-link text-lg leading-snug font-family-sourcecodepro font-normal uppercase text-slate-50 opacity-[.6] py-2.5 px-3.5 rounded-md hover:bg-white/10 hover:text-brand-white hover:font-medium focus:font-medium focus:outline-none flex items-center hover:font-medium"
            >
              About
            </a>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="dropdown-btn nav-link flex items-center text-lg leading-snug font-family-sourcecodepro font-normal uppercase text-slate-50 opacity-60 py-2.5 px-3.5 rounded-md hover:bg-white/10 hover:text-brand-white"
              >
                Dashboard
                <svg
                  className="ml-1 w-3 h-3 text-slate-50"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="6"
                  fill="none"
                  viewBox="0 0 12 6"
                >
                  <path
                    d="M6 4.38L10.05.33c.13-.13.29-.2.48-.2.19 0 .36.07.5.2.14.14.21.3.21.49 0 .18-.07.34-.21.47L6.6 5.74c-.09.09-.18.15-.28.19a.7.7 0 01-.6 0 .72.72 0 01-.28-.19L.96 1.31a.68.68 0 01-.2-.49c0-.19.07-.35.21-.48.14-.13.31-.2.5-.2.19 0 .36.07.48.2L6 4.38z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu absolute space-y-2 grid px-3 py-3 -left-60 mt-2 w-2xl bg-white border-0 rounded-md shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-600 capitalize font-medium font-family-montserrat text-sm/5">
                        dashboards
                      </span>
                      <nav
                        className="sidebar-fill pt-4 flex flex-1 flex-col"
                        aria-label="Sidebar"
                      >
                        <ul role="list" className="-mx-2 space-y-2">
                          {[
                            "Government Fiscal Operations",
                            "The Macro Economy of Sri Lanka",
                            "Transparency in government institutions",
                            "The Finances of SOE",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                className="sidebar-item group items-center flex gap-x-3 rounded-md py-2 px-2.5 text-sm/6 font-medium font-family-sourcecodepro text-slate-800 hover:text-slate-800 hover:bg-brand-1-50 focus:bg-brand-1-950 focus:text-white"
                              >
                                <span className="sidebar-item-icon size-6 shrink-0">
                                  •
                                </span>
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                    <div className="px-3 py-5 rounded bg-no-repeat bg-center bg-cover text-white text-3xl/10 font-family-montserrat font-normal">
                      <p>Discover Meaningful Connections</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#"
              className="nav-link text-lg leading-snug font-family-sourcecodepro font-normal uppercase text-slate-50 opacity-[.6] py-2.5 px-3.5 rounded-md hover:bg-white/10 hover:text-brand-white hover:font-medium focus:font-medium focus:outline-none flex items-center"
            >
              Insights
            </a>
            <a
              href="#"
              className="nav-link text-lg leading-snug font-family-sourcecodepro font-normal uppercase text-slate-50 opacity-[.6] py-2.5 px-3.5 rounded-md hover:bg-white/10 hover:text-brand-white hover:font-medium focus:font-medium focus:outline-none flex items-center"
            >
              Datasets
            </a>
          </nav>

          {/* Search Desktop */}
          <div className="relative hidden lg:block mt-2">
            <button
              onClick={() => setSearchDesktopOpen((o) => !o)}
              className="search-btn"
            >
              <svg
                className="w-4 h-4 lg:w-6 lg:h-6 text-slate-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 19c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm10 2-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {searchDesktopOpen && (
              <form className="search-form absolute -left-60 mt-2">
                <input
                  className="w-64 search-input pr-10 px-4 rounded-full border border-gray-300 bg-white py-2.5 text-sm text-gray-800"
                  type="search"
                  placeholder="Search..."
                />
              </form>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-3.5">
          {/* Search Mobile */}
          <div className="relative mt-1">
            <button
              onClick={() => setSearchMobileOpen((o) => !o)}
              className="search-btn"
            >
              <svg
                className="w-4 h-4 lg:w-6 lg:h-6 text-slate-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 19c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm10 2-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {searchMobileOpen && (
              <form className="search-form absolute right-0 mt-2 z-[9999]">
                <input
                  className="w-52 search-input pr-10 px-4 rounded-full border border-gray-300 bg-white py-2.5 text-sm text-gray-800"
                  type="search"
                  placeholder="Search..."
                />
              </form>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="mobile-menu-toggle text-slate-50"
          >
            {mobileOpen ? (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  d="M15.6 4.4a.83.83 0 010 1.2L5.6 15.6a.83.83 0 01-1.2-1.2l10-10a.83.83 0 011.2 0zm-11.2 0a.83.83 0 011.2 0l10 10a.83.83 0 01-1.2 1.2l-10-10a.83.83 0 010-1.2z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu content */}
      {mobileOpen && (
        <div className="mobile-menu lg:hidden absolute inset-0 top-13 h-screen w-full border-t border-gray-300 z-50 flex flex-col gap-4 px-6 py-6 bg-white">
          <a
            href="#"
            className="nav-link text-lg leading-snug font-family-sourcecodepro font-normal uppercase text-slate-50 opacity-[.6] py-2.5 px-3.5 rounded-md hover:bg-white/10 hover:text-brand-white hover:font-medium focus:font-medium focus:outline-none flex items-center"
          >
            About
          </a>
          <a
            href="#"
            className="nav-link text-lg leading-snug font-family-sourcecodepro font-normal uppercase text-slate-50 opacity-[.6] py-2.5 px-3.5 rounded-md hover:bg-white/10 hover:text-brand-white hover:font-medium focus:font-medium focus:outline-none flex items-center"
          >
            Insights
          </a>
          <a
            href="#"
            className="nav-link text-lg leading-snug font-family-sourcecodepro font-normal uppercase text-slate-50 opacity-[.6] py-2.5 px-3.5 rounded-md hover:bg-white/10 hover:text-brand-white hover:font-medium focus:font-medium focus:outline-none flex items-center"
          >
            Datasets
          </a>
        </div>
      )}
    </header>
  );
}
