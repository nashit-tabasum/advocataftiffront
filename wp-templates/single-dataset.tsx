import React, { JSX, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import HeroWhite from "@/src/components/HeroBlocks/HeroWhite";
import Breadcrumb from "@/src/components/Breadcrumb";
import { WysiwygInner } from "@/src/components/WyisiwygInner";
import SecondaryButton from "@/src/components/Buttons/SecondaryBtn";
import CardType6 from "@/src/components/Cards/CardType6";
import { downloadCsvFile, downloadExcelFromCsv } from "@/src/lib/download";

const SINGLE_DATASET_QUERY = gql`
  query GetSingleDataset($slug: ID!) {
    dataSet(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      uri
      slug
      excerpt
      dataSetFields {
        dataSetFile {
          node {
            mediaItemUrl
          }
        }
      }
      dataSetsCategories {
        nodes {
          id
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
    dataSets(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        uri
        title
        excerpt
        date
        dataSetFields {
          dataSetFile {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

interface SingleDatasetProps {
  data?: {
    dataSet?: {
      id: string;
      title?: string | null;
      content?: string | null;
      date?: string | null;
      uri?: string | null;
      slug?: string | null;
      excerpt?: string | null;
      featuredImage?: {
        node?: { sourceUrl?: string | null; altText?: string | null } | null;
      } | null;
      dataSetFields?: {
        dataSetFile?: { node?: { mediaItemUrl?: string | null } | null } | null;
      } | null;
    } | null;
    dataSets?: {
      nodes?: Array<{
        id: string;
        uri?: string | null;
        title?: string | null;
        excerpt?: string | null;
        date?: string | null;
        dataSetFields?: {
          dataSetFile?: {
            node?: { mediaItemUrl?: string | null } | null;
          } | null;
        } | null;
      }> | null;
    } | null;
  };
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        current.push(field);
        field = "";
      } else if (char === "\n") {
        current.push(field);
        rows.push(current);
        current = [];
        field = "";
      } else if (char === "\r") {
        // ignore CR
      } else {
        field += char;
      }
    }
  }
  // push last field/row
  if (field.length > 0 || current.length > 0) {
    current.push(field);
    rows.push(current);
  }
  return rows;
}

function CsvTable({ url }: { url: string }): JSX.Element | null {
  const [rows, setRows] = useState<string[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!active) return;
        const parsed = parseCsv(text);
        setRows(parsed);
      } catch (e: any) {
        setError(e?.message || "Failed to load CSV");
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [url]);

  if (error)
    return (
      <WysiwygInner>
        <p>{error}</p>
      </WysiwygInner>
    );
  if (!rows) return null;

  const [head = [], ...body] = rows;
  return (
    <div id="table-wrapper" className="overflow-auto rounded-lg shadow-inner">
      <table className="min-w-full text-left">
        {head.length > 0 && (
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {(body.length > 0 ? body : rows).map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const DatasetInnerPage: React.FC<SingleDatasetProps> = ({ data }) => {
  const dataset = data?.dataSet;
  const related = data?.dataSets?.nodes ?? [];
  if (!dataset) return <p>Dataset not found.</p>;

  const _rawExcerpt = dataset.excerpt || dataset.content || "";
  const _plainExcerpt = _rawExcerpt.replace(/<[^>]+>/g, "").trim();
  const heroParagraph =
    _plainExcerpt.length > 260
      ? `${_plainExcerpt.slice(0, 260).trimEnd()}…`
      : _plainExcerpt;
  const downloadUrl =
    dataset.dataSetFields?.dataSetFile?.node?.mediaItemUrl ?? "";

  return (
    <main>
      {/* Hero - White with default breadcrumb colors */}
      <section className="bg-white">
        <div className="px-5 md:px-10 xl:px-16 py-12 md:py-16 xl:py-20 mx-auto w-full">
          <div className="mx-auto max-w-6xl">
            <HeroWhite
              title={dataset.title ?? ""}
              paragraph={heroParagraph}
              items={[{ label: "Datasets", href: "/datasets" }]}
            />
          </div>
        </div>
      </section>

      {/* Body Content */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <WysiwygInner>
            <div dangerouslySetInnerHTML={{ __html: dataset.content ?? "" }} />
          </WysiwygInner>
        </div>
      </section>

      {/* Dataset Table (from dataset file) */}
      {downloadUrl?.toLowerCase().endsWith(".csv") && (
        <section className="bg-white py-8">
          <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
            <CsvTable url={downloadUrl} />
          </div>
        </section>
      )}

      {/* Download Buttons */}
      <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pt-6 md:pt-9 pb-16">
        <div>
          <div className="grid md:flex gap-7 items-center justify-start md:justify-end w-full">
            <div>
              <p className="text-base/6 font-medium font-family-sourcecodepro text-slate-600">
                Download data sources :
              </p>
            </div>
            <div className="flex gap-3 md:gap-2">
              <SecondaryButton
                onClick={() =>
                  downloadCsvFile(downloadUrl, dataset.slug || "dataset")
                }
              >
                PDF
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.5 9.16663V14.1666L9.16667 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.50016 14.1667L5.8335 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3332 8.33329V12.5C18.3332 16.6666 16.6665 18.3333 12.4998 18.3333H7.49984C3.33317 18.3333 1.6665 16.6666 1.6665 12.5V7.49996C1.6665 3.33329 3.33317 1.66663 7.49984 1.66663H11.6665"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3332 8.33329H14.9998C12.4998 8.33329 11.6665 7.49996 11.6665 4.99996V1.66663L18.3332 8.33329Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SecondaryButton>
              <SecondaryButton
                onClick={() =>
                  downloadCsvFile(downloadUrl, dataset.slug || "dataset")
                }
              >
                CSV
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.5 9.16663V14.1666L9.16667 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.50016 14.1667L5.8335 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3332 8.33329V12.5C18.3332 16.6666 16.6665 18.3333 12.4998 18.3333H7.49984C3.33317 18.3333 1.6665 16.6666 1.6665 12.5V7.49996C1.6665 3.33329 3.33317 1.66663 7.49984 1.66663H11.6665"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3332 8.33329H14.9998C12.4998 8.33329 11.6665 7.49996 11.6665 4.99996V1.66663L18.3332 8.33329Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SecondaryButton>
              <SecondaryButton
                onClick={() =>
                  downloadExcelFromCsv(downloadUrl, dataset.slug || "dataset")
                }
              >
                Excel
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.5 9.16663V14.1666L9.16667 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.50016 14.1667L5.8335 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3332 8.33329V12.5C18.3332 16.6666 16.6665 18.3333 12.4998 18.3333H7.49984C3.33317 18.3333 1.6665 16.6666 1.6665 12.5V7.49996C1.6665 3.33329 3.33317 1.66663 7.49984 1.66663H11.6665"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3332 8.33329H14.9998C12.4998 8.33329 11.6665 7.49996 11.6665 4.99996V1.66663L18.3332 8.33329Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>

      {/* Related Datasets */}
      <section className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <WysiwygInner>
            <h2>Related Datasets</h2>
          </WysiwygInner>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(related ?? []).map((c) => (
              <CardType6
                key={c.id}
                title={c.title ?? ""}
                excerpt={c.excerpt ?? ""}
                fileUrl={c.dataSetFields?.dataSetFile?.node?.mediaItemUrl ?? ""}
                postDate={c.date ?? ""}
                uri={c.uri ?? undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DatasetInnerPage;

// Attach Faust query & variables like other templates
(DatasetInnerPage as any).query = SINGLE_DATASET_QUERY;
(DatasetInnerPage as any).variables = (
  seedNode: { slug?: string } = {},
  ctx: GetStaticPropsContext
) => {
  if (!ctx.params?.slug && !seedNode?.slug) {
    throw new Error(
      "DatasetInnerPage.variables: missing slug from params/seedNode."
    );
  }
  const slug =
    (Array.isArray(ctx.params?.slug)
      ? ctx.params?.slug[0]
      : ctx.params?.slug) || seedNode?.slug;
  return { slug };
};
