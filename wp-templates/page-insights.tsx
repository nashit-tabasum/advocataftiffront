import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import React, { useState, useMemo } from "react";
import Link from "next/link";
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
    page?: {
      title?: string | null;
      content?: string | null;
    } | null;
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
      nodes?: Array<{
        id: string;
        name?: string | null;
        slug?: string | null;
      }>;
    };
  };
  loading?: boolean;
}

const insightBgPattern = "/assets/images/patterns/insight-bg-pattern.jpg";

export default function InsightsPage({ data }: InsightsPageProps) {
  const page = data?.page;
  if (!page) return <p>Insights page not found.</p>;

  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pageSize = 6;

  // ✅ categories from WPGraphQL + prepend "All"
  const categories = useMemo(() => {
    const cats = data?.insightsCategories?.nodes ?? [];
    return ["All", ...cats.map((c) => c.name ?? "").filter(Boolean)];
  }, [data?.insightsCategories]);

  // ✅ insights
  const cards = data?.insights?.nodes ?? [];

  // ✅ filter insights (category + search combined)
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

  return (
    <main>
      {/* Hero */}
      <HeroBasic
        bgUrl={insightBgPattern}
        title="Exploring Insights"
        paragraph="Insights are knowledge-rich articles and perspectives curated for better decision-making, research, and awareness."
      />

      {/* Search & Filter Section Start */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pt-5 pb-3.5 md:pb-5 md:pt-10 lg:pt-16 lg:pb-6">
          {/* Search Field */}
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

          {/* Filter Carousel Component */}
          {categories.length > 0 && (
            <FilterCarousel
              items={categories}
              initialActiveIndex={0}
              onChangeActive={(label) => {
                setActiveCategory(label);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      </div>
      {/* Search & Filter Section End */}

      {/* Cards */}
      <div className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginated.map((c) => (
              <CardType5
                key={c.id}
                title={c.title ?? ""}
                excerpt={c.excerpt ?? ""}
                imageUrl={c.featuredImage?.node?.sourceUrl ?? undefined}
                postDate={c.date ?? ""}
                uri={c.uri ?? undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pb-16">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
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
