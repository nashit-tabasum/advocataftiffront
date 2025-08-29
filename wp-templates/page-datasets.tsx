import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import React, { useState, useMemo, useEffect, useRef } from "react";
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

  const rawCats = data?.dataSetsCategories?.nodes ?? [];

  const nameToSlug = useMemo(() => {
    const m = new Map<string, string>();
    m.set("All", "");
    rawCats.forEach((c) => c?.name && c?.slug && m.set(c.name, c.slug));
    return m;
  }, [rawCats]);

  const slugToName = useMemo(() => {
    const m = new Map<string, string>();
    m.set("", "All");
    rawCats.forEach(
      (c) => c?.slug && c?.name && m.set(String(c.slug).toLowerCase(), c.name)
    );
    return m;
  }, [rawCats]);

  const categories = useMemo(
    () => ["All", ...rawCats.map((c) => c.name ?? "").filter(Boolean)],
    [rawCats]
  );

  // Initialize from path (/datasets/:slug?) and ?q=
  useEffect(() => {
    const clean = router.asPath.split("?")[0].split("#")[0];
    const parts = clean.replace(/\/+$/, "").split("/").filter(Boolean);
    const maybeSlug = parts[0] === "datasets" ? parts[1] || "" : "";
    const fromUrl = slugToName.get(maybeSlug.toLowerCase()) || "All";
    setActiveCategory(fromUrl);
    setCurrentPage(1);

    const qp = router.query?.q;
    const qStr = Array.isArray(qp) ? qp[0] : qp;
    if (typeof qStr === "string") setSearchQuery(qStr);
  }, [router.asPath, router.query?.q, slugToName]);

  const datasetCards = data?.dataSets?.nodes ?? [];

  // Global search; category filter applies only when search is empty
  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      return datasetCards.filter((c) => {
        const inTitle = c.title?.toLowerCase().includes(q);
        const inExcerpt = c.excerpt?.toLowerCase().includes(q);
        const inContent = c.content?.toLowerCase()?.includes(q);
        const inCategory = c.dataSetsCategories?.nodes?.some((cat) =>
          cat.name?.toLowerCase().includes(q)
        );
        return inTitle || inExcerpt || inContent || inCategory;
      });
    }
    if (activeCategory !== "All") {
      return datasetCards.filter((c) =>
        c.dataSetsCategories?.nodes?.some((cat) => cat.name === activeCategory)
      );
    }
    return datasetCards;
  }, [activeCategory, searchQuery, datasetCards]);

  // Debounced URL sync
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      const q = searchQuery.trim();
      if (q) {
        const href = `/datasets/?q=${encodeURIComponent(q)}`;
        router.replace(href, href, { shallow: true, scroll: false });
      } else {
        const slug = nameToSlug.get(activeCategory) ?? "";
        const href = slug ? `/datasets/${slug}/` : `/datasets/`;
        router.replace(href, href, { shallow: true, scroll: false });
      }
    }, 250);

    return () => {
      if (syncTimer.current) {
        clearTimeout(syncTimer.current);
        syncTimer.current = null;
      }
    };
  }, [searchQuery, activeCategory, nameToSlug, router]);

  const pageSize = 6;
  const totalItems = filteredCards.length;
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const hasResults = totalItems > 0;

  const isSearching = searchQuery.trim().length > 0;
  const displayActiveCategory = isSearching ? "All" : activeCategory;
  const initialIndex = useMemo(() => {
    const idx = categories.indexOf(displayActiveCategory);
    return idx >= 0 ? idx : 0;
  }, [categories, displayActiveCategory]);

  return (
    <main>
      <section className="dataset-hero relative">
        <div className="absolute inset-0 -z-10" />
        <HeroBasic
          bgUrl={datasetBgPattern}
          title="Research Datasets"
          paragraph="A dataset is a structured collection of data that is organized and stored for analysis, processing, or reference. Datasets typically consist of related data points grouped into tables, files, or arrays, making it easier to work with them in research, analytics, or machine learning."
        />
      </section>

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
              key={`fc-${displayActiveCategory}`}
              items={categories}
              initialActiveIndex={initialIndex}
              onChangeActive={(label) => {
                if (isSearching) return;
                setActiveCategory(label);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      </section>

      <div
        className="prose max-w-none mx-auto px-4"
        dangerouslySetInnerHTML={{ __html: page?.content ?? "" }}
      />

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
                {isSearching
                  ? `No datasets found for “${searchQuery.trim()}”.`
                  : displayActiveCategory === "All"
                    ? "No datasets found."
                    : `No datasets for “${displayActiveCategory}”.`}
              </h3>
              {isSearching ? (
                <p className="mt-2 text-gray-600">
                  Try adjusting your search terms.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {hasResults && (
        <section className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pb-16">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={6}
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
