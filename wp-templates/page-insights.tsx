import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "../src/components/Pagination";
import CardType5 from "../src/components/Cards/CardType5";
import HeroBasic from "../src/components/HeroBlocks/HeroBasic";
import SearchField from "../src/components/InputFields/SearchField";
import FilterCarousel from "../src/components/FilterCarousel";

const PAGE_QUERY = gql`
  query GetInsightsPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
    insights(first: 100) {
      nodes {
        id
        uri
        title
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        insightsCategories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
    insightsCategories(first: 50) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

interface InsightsPageProps {
  data?: {
    page?: { title?: string | null; content?: string | null } | null;
    insights?: {
      nodes?: Array<{
        id: string;
        uri?: string | null;
        title?: string | null;
        excerpt?: string | null;
        date?: string | null;
        featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
        insightsCategories?: {
          nodes?: Array<{
            id: string;
            name?: string | null;
            slug?: string | null;
          }> | null;
        } | null;
      }>;
    };
    insightsCategories?: {
      nodes?: Array<{ id: string; name?: string | null; slug?: string | null }>;
    };
  };
  loading?: boolean;
}

const insightBgPattern = "/assets/images/patterns/insight-bg-pattern.jpg";

export default function InsightsPage({ data }: InsightsPageProps) {
  const page = data?.page;
  const router = useRouter();
  if (!page) return <p>Insights page not found.</p>;

  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pageSize = 6;

  // Raw categories from WPGraphQL
  const rawCats = data?.insightsCategories?.nodes ?? [];

  // Map Name <-> Slug
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

  // Labels (prepend All)
  const categories = useMemo(
    () => ["All", ...rawCats.map((c) => c.name ?? "").filter(Boolean)],
    [rawCats]
  );

  // Derive active tab from URL (works on refresh)
  useEffect(() => {
    const clean = router.asPath.split("?")[0].split("#")[0];
    const parts = clean.replace(/\/+$/, "").split("/").filter(Boolean);
    const maybeSlug = parts[0] === "insights" ? parts[1] || "" : "";
    const fromUrl = slugToName.get(maybeSlug.toLowerCase()) || "All";
    setActiveCategory(fromUrl);
    setCurrentPage(1);
  }, [router.asPath, slugToName]);

  // Compute index for the current activeCategory
  const initialIndex = useMemo(() => {
    const idx = categories.indexOf(activeCategory);
    return idx >= 0 ? idx : 0;
  }, [categories, activeCategory]);

  // insights
  const cards = (data?.insights?.nodes ?? []) as Array<{
    id: string;
    uri?: string | null;
    title?: string | null;
    excerpt?: string | null;
    date?: string | null;
    featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
    insightsCategories?: {
      nodes?: Array<{
        id: string;
        name?: string | null;
        slug?: string | null;
      }> | null;
    } | null;
  }>;

  // filter insights (category + search)
  const filteredCards = useMemo(() => {
    let filtered = cards;

    if (activeCategory !== "All") {
      filtered = filtered.filter((c) =>
        c.insightsCategories?.nodes?.some((cat) => cat.name === activeCategory)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((c) => {
        const inTitle = c.title?.toLowerCase().includes(q);
        const inExcerpt = c.excerpt?.toLowerCase().includes(q);
        const inContent = (c as any).content?.toLowerCase().includes(q);
        const inCategory = c.insightsCategories?.nodes?.some((cat) =>
          cat.name?.toLowerCase().includes(q)
        );
        return inTitle || inExcerpt || inContent || inCategory;
      });
    }

    return filtered;
  }, [activeCategory, searchQuery, cards]);

  const totalItems = filteredCards.length;
  const paginated = filteredCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const hasResults = totalItems > 0;

  return (
    <main>
      {/* Hero */}
      <HeroBasic
        bgUrl={insightBgPattern}
        title="Exploring Insights"
        paragraph="Insights are knowledge-rich articles and perspectives curated for better decision-making, research, and awareness."
      />

      {/* Search & Filter Section */}
      <div className="bg-white">
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
              placeholder="Search insights..."
            />
          </div>

          {categories.length > 0 && (
            <FilterCarousel
              key={`fc-${activeCategory}`} // force remount when active changes
              items={categories}
              initialActiveIndex={initialIndex} // start on the correct tab
              onChangeActive={(label) => {
                setActiveCategory(label);
                setCurrentPage(1);
                // Update URL without reload
                const slug = nameToSlug.get(label) ?? "";
                const href = slug ? `/insights/${slug}` : `/insights`;
                router.push(href, href, { shallow: true, scroll: false });
              }}
            />
          )}
        </div>
      </div>

      {/* Cards / Empty state */}
      <div className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          {hasResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {paginated.map((c) => (
                <CardType5
                  key={c.id}
                  title={c.title ?? ""}
                  excerpt={c.excerpt ?? ""}
                  imageUrl={c.featuredImage?.node?.sourceUrl ?? undefined}
                  postDate={c.date ?? ""}
                  uri={c.uri ?? undefined}
                  categories={c.insightsCategories?.nodes ?? []}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16" aria-live="polite">
              <h3 className="text-xl font-semibold tracking-wide">
                {activeCategory === "All"
                  ? "No insights found."
                  : `No insights for “${activeCategory}”.`}
              </h3>
              {searchQuery.trim() ? (
                <p className="mt-2 text-gray-600">
                  Try clearing the search or selecting another category.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Pagination (only when results exist) */}
      {hasResults && (
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pb-16">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </main>
  );
}

(InsightsPage as any).query = PAGE_QUERY;
(InsightsPage as any).variables = (
  seedNode: { databaseId?: number | string } = {},
  ctx: GetStaticPropsContext
) => {
  if (!seedNode?.databaseId) {
    throw new Error(
      "InsightsPage.variables: missing databaseId from seed node."
    );
  }
  return {
    databaseId: String(seedNode.databaseId),
    asPreview: !!ctx?.preview,
  };
};
