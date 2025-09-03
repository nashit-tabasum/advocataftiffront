import React, { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import SearchField from "@/src/components/InputFields/SearchField";
import CardType6 from "@/src/components/Cards/CardType6";
import Pagination from "@/src/components/Pagination";
import DefaultDropdown from "@/src/components/Dropdowns/DefaultDropdown";
import HeroWhite from "@/src/components/HeroBlocks/HeroWhite";
import SecondaryNav from "@/src/components/SecondaryNav";
import { PageSubTitle, InnerPageTitle } from "@/src/components/Typography";

// Using a shared dropdown component

export default function PageStateOwnedDashboard(): JSX.Element {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [openId, setOpenId] = useState<"one" | "two" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 97;
  const pageSize = 10;

  return (
    <main>
      {/* Secondary Navigation */}
      <div className="bg-white border-b border-slate-300">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 py-4 lg:py-0">
          <SecondaryNav
            items={[
              { label: "Government Fiscal Operations", href: "#" },
              { label: "Government Fiscal Operations", href: "#" },
              { label: "Government Fiscal Operations", href: "#" },
            ]}
          />
        </div>
      </div>

      {/* Hero (white) */}
      <HeroWhite
        title="State Owned Enterprises"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum consequat mi. Maecenas congue enim non dui iaculis condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur lobortis, mi et facilisis euismod, lacus ligula suscipit nibh, vitae blandit dui dolor vitae sapien. Fusce iaculis urna ligula, nec aliquet nisi consectetur euismod. Nunc dapibus dignissim nulla at tincidunt."
        items={[{ label: "State Owned Dashboard" }]}
      />

      {/* Table Section */}
      <section className="bg-white py-3.5 md:py-5 xl:py-6">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          {/* Search + Filters */}
          <div className="lg:flex gap-2 items-center justify-between pb-9">
            {/* Search */}
            <div className="relative w-full xl:w-1/2">
              <SearchField
                value={query}
                onChange={setQuery}
                placeholder="Search..."
              />
            </div>

            <div className="grid md:flex gap-3 items-center w-full lg:w-[31%] mt-4 xl:mt-0">
              <span className="text-slate-800 font-medium text-lg/7 font-family-sourcecodepro md:flex md:justify-items-end mt-3 md:mt-0">
                Filter by :
              </span>

              <DefaultDropdown
                idKey="one"
                label={industry ? `Industry: ${industry}` : "Industry"}
                items={[
                  {
                    label: "Account settings",
                    onClick: () => setIndustry("Account settings"),
                  },
                  { label: "Support", onClick: () => setIndustry("Support") },
                  { label: "License", onClick: () => setIndustry("License") },
                ]}
                align="right"
                open={openId === "one"}
                onOpenChange={(v) => setOpenId(v ? "one" : null)}
              />

              <DefaultDropdown
                idKey="two"
                label={year ? `Year: ${year}` : "Year"}
                items={[
                  { label: "2024", onClick: () => setYear("2024") },
                  { label: "2025", onClick: () => setYear("2025") },
                  { label: "2026", onClick: () => setYear("2026") },
                ]}
                align="right"
                open={openId === "two"}
                onOpenChange={(v) => setOpenId(v ? "two" : null)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="shadow-md border p-4 border-gray-200 rounded-lg">
            <div
              id="table-wrapper"
              className="overflow-x-auto overflow-y-auto max-w-full box-content"
            >
              <div className="w-[1200px] table-inner">
                <table className="border-collapse bg-white border-b border-gray-100 min-w-max rounded-lg">
                  <thead className="bg-brand-1-700 rounded-lg">
                    <tr>
                      <th className="sticky top-0 left-0 z-20 rounded-tl-lg bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        SOE
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        2024
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        Turnover (LKR)
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        Total Assets
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        Profit/Loss
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        Total Debt
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        Total Liabilities
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        Total Equity
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        Operational Profits
                      </th>
                      <th className="sticky top-0 z-10 rounded-tr-lg bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[288px]">
                        ROA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {/* Aviation sector header */}
                    <tr className="border-gray-100">
                      <td className="sector sticky top-0 left-0 z-20 bg-brand-white text-brand-1-700 px-3 py-3.5 text-left text-base/6 font-family-sourcecodepro font-semibold w-[160px] md:whitespace-nowrap">
                        Aviation
                      </td>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <td
                          key={i}
                          className="bg-brand-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]"
                        />
                      ))}
                    </tr>

                    {/* Row 1 */}
                    <tr>
                      <td className="sticky left-0 bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-family-sourcecodepro font-medium text-brand-black w-[160px] md:w-[225px] xl:w-[288px] md:whitespace-nowrap">
                        Airport and Aviation Services (Sri Lanka) Ltd.
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        7,575,860
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        103,216,071
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        -2,504,430
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        60,031,623
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        66,233,170
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        66,233,170
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        -4,610,768
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <circle cx="6" cy="6" r="6" fill="#22C55E" />
                          </svg>
                          <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">
                            1
                          </span>
                        </div>
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <circle cx="6" cy="6" r="6" fill="#DC2626" />
                          </svg>
                          <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">
                            0
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr>
                      <td className="sticky left-0 bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-family-sourcecodepro font-medium text-brand-black w-[160px] md:w-[225px] xl:w-[288px] md:whitespace-nowrap">
                        SriLankan Airlines Ltd.
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        183,531,820
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        186,428,560
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        -44,139,400
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        213,306,320
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        -5,167,240
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        447,602,100
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        -261,173,540
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        -5,167,240
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px] md:w-[225px] xl:w-[288px]">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <circle cx="6" cy="6" r="6" fill="#F59E0B" />
                          </svg>
                          <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">
                            0.5
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indicators legend */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pt-6 md:pt-9 pb-16">
        <div>
          <div className="grid md:flex gap-7 items-center justify-start md:justify-end w-full">
            <div>
              <p className="text-base/6 font-medium font-family-sourcecodepro text-slate-600">
                Interpretation of the indicators :
              </p>
            </div>
            <div className="flex items-center gap-3 md:gap-5">
              <div className="flex items-center gap-3 md:border-r border-slate-300 pr-3 md:pr-4">
                <span className="text-sm/tight font-medium font-family-sourcecodepro text-slate-600">
                  Good
                </span>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle cx="6" cy="6" r="6" fill="#22C55E" />
                  </svg>
                  <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">
                    1
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 md:border-r border-slate-300 pr-3 md:pr-4">
                <span className="text-sm/tight font-medium font-family-sourcecodepro text-slate-600">
                  Average
                </span>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle cx="6" cy="6" r="6" fill="#F59E0B" />
                  </svg>
                  <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">
                    0.5
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm/tight font-medium font-family-sourcecodepro text-slate-600">
                  Poor
                </span>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle cx="6" cy="6" r="6" fill="#DC2626" />
                  </svg>
                  <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pt-6 md:pt-9 pb-16">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </section>

      {/* Related datasets */}
      <section className="bg-pink-100 py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="max-w-2xl text-left">
            <PageSubTitle className="page-sub-title">
              Advocata ai suggestions
            </PageSubTitle>
            <InnerPageTitle className="page-title">
              Related datasets
            </InnerPageTitle>
          </div>

          <div className="mt-11 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <CardType6
              title="Sri Lanka - Food Security and Nutrition Indicators"
              excerpt="By comparison, just before the nation’s independence nearly 250 years ago, the 13 colonies had about 2.5 million residents. The projected world population on January 1, 2025, is 8,092,034,511, up 71,178,087 (0.89%) from New Year’s Day 2024. During January 2025, 4.2 births and 2.0 deaths are expected worldwide every second."
              fileUrl=""
              postDate="2024-08-18"
              uri="#"
            />

            <CardType6
              title="TESLA Stock Data 2024"
              excerpt="By comparison, just before the nation’s independence nearly 250 years ago, the 13 colonies had about 2.5 million residents. The projected world population on January 1, 2025, is 8,092,034,511, up 71,178,087 (0.89%) from New Year’s Day 2024. During January 2025, 4.2 births and 2.0 deaths are expected worldwide every second."
              fileUrl=""
              postDate="2024-08-18"
              uri="#"
            />

            <CardType6
              title="Effective crisis management leads Sri Lanka’s tourism."
              excerpt="By comparison, just before the nation’s independence nearly 250 years ago, the 13 colonies had about 2.5 million residents. The projected world population on January 1, 2025, is 8,092,034,511, up 71,178,087 (0.89%) from New Year’s Day 2024. During January 2025, 4.2 births and 2.0 deaths are expected worldwide every second."
              fileUrl=""
              postDate="2024-08-18"
              uri="#"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
