import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Pagination from "../src/components/Pagination";
import CardType6 from "../src/components/Cards/CardType6";
import HeroBasic from "../src/components/HeroBlocks/HeroBasic";
import SearchField from "../src/components/InputFields/SearchField";
import FilterCarousel from "../src/components/FilterCarousel";

const PAGE_QUERY = gql`
  query GetDatasetsPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
    dataSets(first: 100) {
      nodes {
        id
        uri
        title
        excerpt
        content
        date
        dataSetsCategories {
          nodes {
            id
            name
            slug
          }
        }
        dataSetFields {
          dataSetFile {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    dataSetsCategories(first: 50) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

interface DatasetsPageProps {
  data?: {
    page?: {
      title?: string | null;
      content?: string | null;
    } | null;
    dataSets?: {
      nodes?: Array<{
        id: string;
        uri?: string | null;
        title?: string | null;
        excerpt?: string | null;
        content?: string | null;
        date?: string | null;
        dataSetsCategories?: {
          nodes?: Array<{
            id: string;
            name?: string | null;
            slug?: string | null;
          }> | null;
        } | null;
        dataSetFields?: {
          dataSetFile?: {
            node?: {
              mediaItemUrl?: string | null;
            } | null;
          } | null;
        } | null;
      }> | null;
    };
    dataSetsCategories?: {
      nodes?: Array<{
        id: string;
        name?: string | null;
        slug?: string | null;
      }> | null;
    };
  };
  loading?: boolean;
}

const datasetBgPattern = "/assets/images/patterns/dataset-bg-pattern.jpg";

export default function DatasetsPage({ data }: DatasetsPageProps) {
  const page = data?.page;
  if (!page) return <p>Datasets page not found.</p>;

  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ✅ categories from WPGraphQL + prepend "All"
  const categories = useMemo(() => {
    const cats = data?.dataSetsCategories?.nodes ?? [];
    return [...cats.map((c) => c.name ?? "").filter(Boolean)];
  }, [data?.dataSetsCategories]);

  // ✅ datasets
  const datasetCards = data?.dataSets?.nodes ?? [];

  // ✅ filter datasets (category + search)
  const filteredCards = useMemo(() => {
    let filtered = datasetCards;

    if (activeCategory !== "All") {
      filtered = filtered.filter((c) =>
        c.dataSetsCategories?.nodes?.some((cat) => cat.name === activeCategory)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((c) => {
        const inTitle = c.title?.toLowerCase().includes(q);
        const inExcerpt = c.excerpt?.toLowerCase().includes(q);
        const inContent = c.content?.toLowerCase().includes(q);
        const inCategory = c.dataSetsCategories?.nodes?.some((cat) =>
          cat.name?.toLowerCase().includes(q)
        );

        return inTitle || inExcerpt || inContent || inCategory;
      });
    }

    return filtered;
  }, [activeCategory, searchQuery, datasetCards]);

  // ✅ pagination
  const pageSize = 6;
  const totalItems = filteredCards.length;
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <main>
      {/* Hero Section */}
      <section className="dataset-hero relative">
        <div className="absolute inset-0 -z-10"></div>
        <HeroBasic
          bgUrl={datasetBgPattern}
          title="Research Datasets"
          paragraph="A dataset is a structured collection of data that is organized and stored for analysis, processing, or reference. Datasets typically consist of related data points grouped into tables, files, or arrays, making it easier to work with them in research, analytics, or machine learning."
        />
      </section>

      {/* Search & Filter Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pt-5 pb-3.5 md:pb-5 md:pt-10 lg:pt-16 lg:pb-6">
          <div className="pb-8">
            <SearchField
              value={searchQuery}
              onChange={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              onSubmit={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              placeholder="Search datasets..."
            />
          </div>

          {categories.length > 0 && (
            <FilterCarousel
              items={categories}
              initialActiveIndex={0}
              onChangeActive={(label) => {
                setActiveCategory(label);
                setCurrentPage(1); // reset to page 1 on filter change
              }}
            />
          )}
        </div>
      </section>

      <div
        className="prose max-w-none mx-auto px-4"
        dangerouslySetInnerHTML={{ __html: page?.content ?? "" }}
      />

      {/* Cards */}
      <section className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedCards.map((c) => {
              const fileUrl =
                c.dataSetFields?.dataSetFile?.node?.mediaItemUrl ?? "";
              return (
                <CardType6
                  key={c.id}
                  title={c.title ?? ""}
                  excerpt={c.excerpt ?? ""}
                  fileUrl={fileUrl}
                  postDate={c.date ?? ""}
                  uri={c.uri ?? undefined}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pb-16">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
}

(DatasetsPage as any).query = PAGE_QUERY;
(DatasetsPage as any).variables = (
  seedNode: { databaseId?: number | string } = {},
  ctx: GetStaticPropsContext
) => {
  if (!seedNode?.databaseId) {
    throw new Error(
      "DatasetsPage.variables: missing databaseId from seed node."
    );
  }
  return {
    databaseId: String(seedNode.databaseId),
    asPreview: !!ctx?.preview,
  };
};
