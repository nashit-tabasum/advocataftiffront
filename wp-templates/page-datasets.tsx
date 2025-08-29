import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
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
    page?: { title?: string | null; content?: string | null } | null;
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
            node?: { mediaItemUrl?: string | null } | null;
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
  const router = useRouter();
  if (!page) return <p>Datasets page not found.</p>;

  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Raw categories from WPGraphQL
  const rawCats = data?.dataSetsCategories?.nodes ?? [];

  // Build name <-> slug maps
  const nameToSlug = useMemo(() => {
    const m = new Map<string, string>();
    m.set("All", "");
    rawCats.forEach((c) => {
      if (c?.name && c?.slug) m.set(c.name, c.slug);
    });
    return m;
  }, [rawCats]);

  const slugToName = useMemo(() => {
    const m = new Map<string, string>();
    m.set("", "All");
    rawCats.forEach((c) => {
      if (c?.slug && c?.name) m.set(String(c.slug).toLowerCase(), c.name);
    });
    return m;
  }, [rawCats]);

  // Labels for the carousel (prepend "All")
  const categories = useMemo(
    () => ["All", ...rawCats.map((c) => c.name ?? "").filter(Boolean)],
    [rawCats]
  );

  // Sync active tab from URL on initial load/refresh (works with rewrites)
  useEffect(() => {
    const clean = router.asPath.split("?")[0].split("#")[0];
    const parts = clean.replace(/\/+$/, "").split("/").filter(Boolean);
    // expecting ["datasets", "<slug?>"]
    const maybeSlug = parts[0] === "datasets" ? parts[1] || "" : "";
    const fromUrl = slugToName.get(maybeSlug.toLowerCase()) || "All";
    setActiveCategory(fromUrl);
    setCurrentPage(1);
  }, [router.asPath, slugToName]);

  // Compute the starting index for FilterCarousel
  const initialIndex = useMemo(() => {
    const idx = categories.indexOf(activeCategory);
    return idx >= 0 ? idx : 0;
  }, [categories, activeCategory]);

  // datasets
  const datasetCards = data?.dataSets?.nodes ?? [];

  // filter datasets (category + search)
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

  // pagination
  const pageSize = 6;
  const totalItems = filteredCards.length;
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const hasResults = totalItems > 0;

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
              key={`fc-${activeCategory}`} // force remount when active changes
              items={categories}
              initialActiveIndex={initialIndex} // start on correct tab
              onChangeActive={(label) => {
                setActiveCategory(label);
                setCurrentPage(1);

                // Update the URL without reload
                const slug = nameToSlug.get(label) ?? "";
                const href = slug ? `/datasets/${slug}` : `/datasets`;
                router.push(href, href, { shallow: true, scroll: false });
              }}
            />
          )}
        </div>
      </section>

      <div
        className="prose max-w-none mx-auto px-4"
        dangerouslySetInnerHTML={{ __html: page?.content ?? "" }}
      />

      {/* Cards / Empty state */}
      <section className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          {hasResults ? (
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
          ) : (
            <div className="text-center py-16" aria-live="polite">
              <h3 className="text-xl font-semibold tracking-wide">
                {activeCategory === "All"
                  ? "No datasets found."
                  : `No datasets for “${activeCategory}”.`}
              </h3>
              {searchQuery.trim() ? (
                <p className="mt-2 text-gray-600">
                  Try clearing the search or selecting another category.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* Pagination (only when results exist) */}
      {hasResults && (
        <section className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pb-16">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </section>
      )}
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
  return { databaseId: String(seedNode.databaseId), asPreview: !!ctx?.preview };
};
