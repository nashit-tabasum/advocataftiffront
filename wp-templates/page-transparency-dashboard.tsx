import React, { useState, type JSX } from "react";
import SecondaryNav from "@/src/components/SecondaryNav";
import HeroWhite from "@/src/components/HeroBlocks/HeroWhite";
import SearchField from "@/src/components/InputFields/SearchField";
import DefaultDropdown from "@/src/components/Dropdowns/DefaultDropdown";
import Pagination from "@/src/components/Pagination";
import CardType6 from "@/src/components/Cards/CardType6";
import { PageSubTitle, InnerPageTitle } from "@/src/components/Typography";

export default function PageTransparencyDashboard(): JSX.Element {
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
              { label: "Macro Economy", href: "#" },
              { label: "Government Fiscal Operations", href: "#" },
              { label: "Transparency in government Institutions", href: "#" },
              { label: "State Owned Enterprises", href: "#" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <HeroWhite
        title="Transparency in Government Institutions"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum consequat mi. Maecenas congue enim non dui iaculis condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur lobortis, mi et facilisis euismod, lacus ligula suscipit nibh, vitae blandit dui dolor vitae sapien. Fusce iaculis urna ligula, nec aliquet nisi consectetur euismod. Nunc dapibus dignissim nulla at tincidunt."
        items={[{ label: "Transparency Dashboard" }]}
      />

      {/* Filters */}
      <section className="bg-white pb-3.5 md:pb-5 xl:pb-6">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="lg:flex gap-2 items-center justify-between pb-9">
            <div className="relative w-full xl:w-1/2">
              <SearchField value={query} onChange={setQuery} placeholder="Search..." />
            </div>

            <div className="grid md:flex gap-3 items-center w-full lg:w-[31%] mt-4 xl:mt-0">
              <span className="text-slate-800 font-medium text-lg/7 font-family-sourcecodepro md:flex md:justify-items-end mt-3 md:mt-0">
                Filter by :
              </span>

              <DefaultDropdown
                idKey="one"
                label={industry ? `Industry: ${industry}` : "Industry"}
                items={[
                  { label: "Industry 1", onClick: () => setIndustry("Industry 1") },
                  { label: "Industry 2", onClick: () => setIndustry("Industry 2") },
                  { label: "Industry 3", onClick: () => setIndustry("Industry 3") },
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
            <div id="table-wrapper" className="overflow-x-auto overflow-y-auto max-w-full box-content">
              <div className="w-[1200px] table-inner">
                <table className="border-collapse bg-white border-b border-gray-100 min-w-max rounded-lg">
                  <thead className="bg-brand-1-700 rounded-lg">
                    {/* Header row 1 */}
                    <tr>
                      <th
                        className="sticky top-0 left-0 z-20 rounded-tl-lg bg-brand-1-700 px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px]"
                        rowSpan={2}
                      >
                        SOE
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-center border-b border-gray/10 text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white/60" colSpan={3}>
                        Annual report
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-center border-b border-gray/10 text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white/60" colSpan={2}>
                        Auditing Standards
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-center border-b border-gray/10 text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white/60" colSpan={1}>
                        Right to Information
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-center border-b border-gray/10 text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white/60" colSpan={3}>
                        Accessibility of Information
                      </th>
                    </tr>

                    {/* Header row 2 */}
                    <tr>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Year of the most recent Annual Report
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Have Annual Reports for the last five years been tabled in Parliament?
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Does the Annual Report include mandatory provisions set out in the PED guidelines?
                      </th>

                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Is the Audit Clean/Qualified/Disclaimer?
                      </th>

                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Is the information pertaining to the RTI officer available on the website?
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Does the SOE respond to an RTI within the timeframe specified in the Act?
                      </th>

                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Does the SOE have a website?
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Does the SOE website contain sufficient organizational details?
                      </th>
                      <th className="sticky top-0 z-10 bg-brand-1-700 px-3 py-3.5 text-left text-base/6 font-semibold font-family-sourcecodepro uppercase text-brand-white w-[160px] md:w-[225px] xl:w-[250px] align-baseline">
                        Does the SOE website contain tender and procurement details?
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-300">
                    {/* Sector */}
                    <tr className="border-gray-100">
                      <td className="sector sticky top-0 left-0 z-20 bg-brand-white text-brand-1-700 px-3 py-3.5 text-left text-base/6 font-family-sourcecodepro font-semibold w-[160px] md:whitespace-nowrap">
                        Aviation
                      </td>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <td key={i} className="bg-brand-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]" />
                      ))}
                    </tr>

                    {/* Row 1 */}
                    <tr>
                      <td className="sticky left-0 bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-family-sourcecodepro font-medium text-brand-black w-[160px] md:whitespace-nowrap">
                        Airport and Aviation Services (Sri Lanka) Ltd.
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]">2024</td>
                      {[
                        { color: "#22C55E", text: "Yes" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#F59E0B", text: "Qualified" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#F59E0B", text: "Partially" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#F59E0B", text: "Partially" },
                      ].map((it, idx) => (
                        <td key={idx} className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <circle cx="6" cy="6" r="6" fill={it.color} />
                            </svg>
                            <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">{it.text}</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Row 2 */}
                    <tr>
                      <td className="sticky left-0 bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-family-sourcecodepro font-medium text-brand-black w-[160px] md:whitespace-nowrap">
                        SriLankan Airlines Ltd.
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]">2024</td>
                      {[
                        { color: "#22C55E", text: "Yes" },
                        { color: "#DC2626", text: "No" },
                        { color: "#F59E0B", text: "Qualified" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#22C55E", text: "Yes" },
                      ].map((it, idx) => (
                        <td key={idx} className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <circle cx="6" cy="6" r="6" fill={it.color} />
                            </svg>
                            <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">{it.text}</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Sector */}
                    <tr className="border-gray-100">
                      <td className="sector sticky top-0 left-0 z-20 bg-brand-white text-brand-1-700 px-3 py-3.5 text-left text-base/6 font-family-sourcecodepro font-semibold w-[160px] md:whitespace-nowrap">
                        Banking and Finance
                      </td>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <td key={i} className="bg-brand-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]" />
                      ))}
                    </tr>

                    {/* Row 3 */}
                    <tr>
                      <td className="sticky left-0 bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-family-sourcecodepro font-medium text-brand-black w-[160px] md:whitespace-nowrap">
                        Bank of Ceylon
                      </td>
                      <td className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]">2024</td>
                      {[
                        { color: "#22C55E", text: "Yes" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#F59E0B", text: "Qualified" },
                        { color: "#DC2626", text: "No" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#F59E0B", text: "Partially" },
                        { color: "#22C55E", text: "Yes" },
                        { color: "#DC2626", text: "No" },
                      ].map((it, idx) => (
                        <td key={idx} className="bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500 w-[160px]">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <circle cx="6" cy="6" r="6" fill={it.color} />
                            </svg>
                            <span className="text-gray-500 font-family-sourcecodepro text-base/6 font-medium">{it.text}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pt-6 md:pt-9 pb-16">
        <Pagination currentPage={currentPage} totalItems={totalItems} pageSize={pageSize} onPageChange={setCurrentPage} />
      </section>

      {/* Related datasets */}
      <section className="bg-pink-100 py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="max-w-2xl text-left">
            <PageSubTitle className="page-sub-title">Advocata ai suggestions</PageSubTitle>
            <InnerPageTitle className="page-title">Related datasets</InnerPageTitle>
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

