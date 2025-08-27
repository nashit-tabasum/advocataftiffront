import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import React, { useState } from "react";
import EntryHeader from "../src/components/EntryHeader";
import CardType5 from "../src/components/Cards/CardType5";
import Pagination from "../src/components/Pagination";
import FilterCarousel from "../src/components/FilterCarousel";
import HeroBasic from "../src/components/HeroBlocks/HeroBasic";
import SearchField from "@/src/components/InputFields/SearchField";

const PAGE_QUERY = gql`
  query GetInsightsPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;

interface InsightsPageProps {
  data?: {
    page?: {
      title?: string | null;
      content?: string | null;
    } | null;
  };
  loading?: boolean;
}

const insightBgPattern = "/assets/images/patterns/insight-bg-pattern.jpg";

// just to drive the grid count (content comes from CardType5 itself)
const insightCards = Array.from({ length: 9 }).map((_, i) => ({ id: i + 1 }));

export default function InsightsPage({ data }: InsightsPageProps) {
  const page = data?.page;
  if (!page) return <p>Insights page not found.</p>;

  const title = page?.title ?? "Insights";
  const html: string = page?.content ?? "";

  const [currentPage, setCurrentPage] = useState(1);

  // Pagination totals (mirror your PHP example)
  const totalItems = 97;
  const pageSize = 10;

  return (
    <main>
      <div
        className="prose max-w-none mx-auto px-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />

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

      {/* Card Section Start */}
      <div className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {insightCards.map((c) => (
              <div key={c.id}>
                <CardType5 />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Card Section End */}

      {/* Pagination Section Start */}
      <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16 pb-16">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
      {/* Pagination Section End */}
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
