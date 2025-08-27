import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import EntryHeader from "../src/components/EntryHeader";
import FilterCarousel from "../src/components/FilterCarousel";
import Pagination from "../src/components/Pagination";
import CardType6 from "../src/components/Cards/CardType6";
import HeroBasic from "../src/components/HeroBlocks/HeroBasic";
import SearchField from "../src/components/InputFields/SearchField";

const PAGE_QUERY = gql`
  query GetDatasetsPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;

interface DatasetsPageProps {
  data?: {
    page?: {
      title?: string | null;
      content?: string | null;
    } | null;
  };
  loading?: boolean;
}

const datasetBgPattern = "/assets/images/patterns/dataset-bg-pattern.jpg";

type DatasetCard = {
  id: number;
  title: string;
  content: string;
  categories: string[];
};

const datasetCards: DatasetCard[] = [
  {
    title: "Sri Lanka - Food Security and Nutrition Indicators",
    content:
      "Indicators and models on food security, nutrition status, and policy analysis.",
    categories: ["nutrition", "security", "policy", "model"],
  },
  {
    title: "TESLA Stock Data 2024",
    content: "Time series dataset for stock price modeling and forecasting.",
    categories: ["finance", "stock", "model", "timeseries"],
  },
  {
    title: "Global IOM Displacement Tracking Matrix (DTM) from API",
    content:
      "Population displacement, mobility tracking, and humanitarian data.",
    categories: ["migration", "population", "api"],
  },
  {
    title: "OCHA Global Subnational Population Statistics",
    content: "Administrative unit population, demographics, and projections.",
    categories: ["population", "demographics"],
  },
  {
    title: "Sri Lanka's Economic Outlook: Predictions for the Coming Year",
    content: "Macro forecasts, econometric models, and scenario analysis.",
    categories: ["economy", "forecast", "model"],
  },
  {
    title: "Government Policies and Their Impact on Sri Lanka's Economy",
    content: "Policy changes, outcomes, and sectoral impact assessments.",
    categories: ["policy", "impact", "assessment"],
  },
  {
    title: "Sri Lanka's Export Growth: Key Industries to Watch",
    content: "Trade flows, export trends, and industrial performance models.",
    categories: ["trade", "export", "industry"],
  },
  {
    title: "Analyzing the Labor Market Trends in Sri Lanka",
    content: "Employment, wages, and labor market modeling datasets.",
    categories: ["labor", "employment", "model"],
  },
  {
    title: "The Role of Technology in Boosting Sri Lanka's Economy",
    content: "Digital adoption, productivity, and innovation metrics.",
    categories: ["technology", "innovation"],
  },
  {
    title: "Tourism Recovery in Sri Lanka: Economic Implications",
    content: "Tourism arrivals, revenue, and recovery models post-shock.",
    categories: ["tourism", "recovery", "model"],
  },
  {
    title: "Sri Lanka's Financial Sector: Innovations and Challenges",
    content: "Fintech, banking indicators, risk models, and regulation.",
    categories: ["finance", "banking", "risk", "model"],
  },
  {
    title: "Sri Lanka's Trade Balance: Analyzing Recent Trends",
    content: "Imports, exports, and balance of trade analytics.",
    categories: ["trade", "balance"],
  },
  {
    title: "The Future of Renewable Energy in Sri Lanka's Economy",
    content: "Energy capacity, investment models, and policy scenarios.",
    categories: ["energy", "renewable", "model"],
  },
  {
    title: "Economic Insights: The Impact of Inflation on Sri Lanka's Growth",
    content: "Prices, CPI, inflation dynamics, and macroeconomic models.",
    categories: ["inflation", "prices", "model"],
  },
].map((c, i) => ({ id: i + 1, ...c }));

export default function DatasetsPage({ data }: DatasetsPageProps) {
  const page = data?.page;
  if (!page) return <p>Datasets page not found.</p>;

  const title = page?.title ?? "Datasets";
  const html: string = page?.content ?? "";

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return datasetCards;
    return datasetCards.filter((c) => {
      if (c.title.toLowerCase().includes(q)) return true;
      if (c.content.toLowerCase().includes(q)) return true;
      if (c.categories.some((cat) => cat.toLowerCase().includes(q)))
        return true;
      return false;
    });
  }, [query]);

  // pagination totals to match your example
  const totalItems = 97;
  const pageSize = 10;

  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>

      <div
        className="prose max-w-none mx-auto px-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />

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
              value={query}
              onChange={setQuery}
              onSubmit={setQuery}
              placeholder="Search datasets..."
            />
          </div>
          {/* ✅ Use FilterCarousel component */}
          <FilterCarousel
            items={[
              "Provincial Councils",
              "All datasets",
              "Management",
              "Budget",
              "Financing",
              "Direction",
              "Expenditure",
              "Revenue",
              "Debt",
            ]}
            activeIndex={2}
            onSelect={(item) => console.log("Selected:", item)}
          />
        </div>
      </section>

      {/* Cards */}
      <section className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCards.map((c) => (
              <div key={c.id}>
                {/* ✅ CardType6 used as requested (component unchanged) */}
                <CardType6 />
              </div>
            ))}
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
