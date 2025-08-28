import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import React, { useState } from "react";
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
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
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
  const pageSize = 6;

  const cards = data?.insights?.nodes ?? [];
  const totalItems = cards.length;
  const paginated = cards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <main>
      {/* Hero */}
      <HeroBasic
        bgUrl={insightBgPattern}
        title="Exploring Insights"
        paragraph="A dataset is a structured collection of data that is organized and stored for analysis, processing, or reference. Datasets typically consist of related data points grouped into tables, files, or arrays, making it easier to work with them in research, analytics, or machine learning."
      />

      {/* Search & Filter Section Start */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pt-5 pb-3.5 md:pb-5 md:pt-10 lg:pt-16 lg:pb-6">
          {/* Search Field */}
          <div className="pb-8">
            <SearchField />
          </div>

          {/* Filter Carousel Component (unchanged) */}
          <FilterCarousel />
        </div>
      </div>
      {/* Search & Filter Section End */}

      {/* Cards */}
      <div className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginated.map((c) => (
              <Link href={c.uri ?? "#"} key={c.id} className="block h-full">
                <CardType5
                  title={c.title ?? ""}
                  excerpt={c.excerpt ?? ""}
                  imageUrl={c.featuredImage?.node?.sourceUrl ?? undefined}
                  postDate={c.date ?? ""}
                />
              </Link>
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
