"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface CsvTableProps {
  csvUrl: string;
  // Optional case-insensitive row filter; matches any cell
  filterQuery?: string;
}

export default function CsvTable({ csvUrl, filterQuery }: CsvTableProps) {
  const [rows, setRows] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!csvUrl) {
      setError("No CSV file URL provided.");
      return;
    }

    const proxiedUrl = `https://corsproxy.io/?${csvUrl}`;

    fetch(proxiedUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch CSV file.");
        return res.text();
      })
      .then((text) => {
        const result = Papa.parse<string[]>(text, { skipEmptyLines: true });
        if (result.errors.length > 0) {
          setError("Error parsing CSV.");
          console.error("CSV Parse Errors:", result.errors);
        } else {
          setRows(result.data as string[][]);
          setError(null);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [csvUrl]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (rows.length === 0) return <p>Loading table...</p>;

  const headers = rows[0];
  const dataRows = rows.slice(1);

  // Filter rows by query across all cells (case-insensitive)
  const q = (filterQuery ?? "").trim().toLowerCase();
  const visibleRows = q
    ? dataRows.filter((row) =>
        row.some((cell) => (cell ?? "").toString().toLowerCase().includes(q))
      )
    : dataRows;

  // Utility: format cell values
  const formatCell = (value: string): React.ReactNode => {
    if (
      !value ||
      value.trim() === "" ||
      value.toLowerCase().includes("data n/a")
    ) {
      return <span className="text-brand-1-600 font-medium">Data N/A</span>;
    }

    // Try to format number
    const num = Number(value);
    if (!isNaN(num)) {
      return num.toLocaleString("en-US"); // 75000 -> 75,000
    }

    return value;
  };

  return (
    <div className="bg-white py-3.5 md:py-5 xl:py-6">
      <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
        <div className="shadow-md border p-4 border-gray-200 rounded-lg">
          {/* Table wrapper */}
          <div
            id="table-wrapper"
            className="overflow-x-auto overflow-y-auto max-w-full box-content"
          >
            {/* Force visible width (adjust as needed) */}
            <div className="w-[1200px] table-inner">
              <table className="border-collapse bg-white border-b border-gray-100 min-w-max rounded-lg">
                <thead>
                  <tr>
                    {headers.map((header, i) => (
                      <th
                        key={i}
                        className={`px-3 py-3.5 text-left text-lg/7 font-semibold font-family-sourcecodepro uppercase text-brand-white bg-brand-1-700
          ${i === 0 ? "sticky top-0 left-0 z-20 rounded-tl-lg" : ""}
          ${i === headers.length - 1 ? "rounded-tr-lg" : ""}
          w-[160px] md:w-[225px] xl:w-[288px]`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-300">
                  {visibleRows.length === 0 && (
                    <tr>
                      <td
                        className="px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro text-gray-500"
                        colSpan={headers.length}
                      >
                        {q ? "No matching results." : "No data available."}
                      </td>
                    </tr>
                  )}
                  {visibleRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`bg-white border-b border-gray-100 px-3 py-3.5 text-left text-base/6 font-medium font-family-sourcecodepro 
                            ${
                              cellIndex === 0
                                ? "sticky left-0 text-brand-black md:whitespace-nowrap"
                                : "text-gray-500"
                            }
                            w-[160px] md:w-[225px] xl:w-[288px]`}
                        >
                          {formatCell(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
