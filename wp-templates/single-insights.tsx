import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import React from "react";
import HeroBlack from "@/src/components/HeroBlocks/HeroBlack";
import { SingleInner } from "@/src/components/SingleInner";
import CardType5 from "@/src/components/Cards/CardType5";
import { PageSubTitle, PageTitle } from "@/src/components/Typography";

const SINGLE_INSIGHT_QUERY = gql`
  query GetSingleInsight($slug: ID!) {
    insight(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      uri
      slug
      featuredImage {
        node {
          sourceUrl
          altText
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
    insights(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        excerpt
        date
        slug
        uri
        featuredImage {
          node {
            sourceUrl
            altText
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
  }
`;

interface SingleInsightProps {
  data?: {
    insight?: {
      id: string;
      title?: string | null;
      content?: string | null;
      date?: string | null;
      uri?: string | null;
      slug?: string | null;
      featuredImage?: {
        node?: { sourceUrl?: string | null; altText?: string | null } | null;
      } | null;
      insightsCategories?: {
        nodes?: Array<{
          id: string;
          name?: string | null;
          slug?: string | null;
        }> | null;
      } | null;
    } | null;
    insights?: {
      nodes?: Array<{
        id: string;
        title?: string | null;
        excerpt?: string | null;
        date?: string | null;
        slug?: string | null;
        uri?: string | null;
        featuredImage?: {
          node?: { sourceUrl?: string | null; altText?: string | null } | null;
        } | null;
        insightsCategories?: {
          nodes?: Array<{
            id: string;
            name?: string | null;
            slug?: string | null;
          }> | null;
        } | null;
      }> | null;
    } | null;
  };
}

export default function SingleInsight({ data }: SingleInsightProps) {
  const insight = data?.insight;
  const related = data?.insights?.nodes ?? [];

  if (!insight) return <p>Insight not found.</p>;

  const dateText = insight.date
    ? new Date(insight.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <main>
      {/* Hero Section */}
      <HeroBlack
        title={insight.title ?? ""}
        dateText={dateText}
        homeHref="/"
        items={[{ label: "Insights", href: "/insights" }]}
      />

      <div className="bg-white py-10 md:py-16 xl:py-20">
        <div className="mx-auto max-w-full">
          <div className="mx-auto max-w-4xl px-5 md:px-10 xl:px-16">
            <SingleInner>
              {insight.title && <h2>{insight.title}</h2>}
              <div
                dangerouslySetInnerHTML={{ __html: insight.content ?? "" }}
              />
            </SingleInner>
          </div>
        </div>
      </div>

      {/* Related Highlights */}
      {related.length > 0 && (
        <div className="bg-pink-100 py-12 md:py-16 xl:py-20">
          <div className="mx-auto max-w-full px-5 md:px-10 xl:px-16">
            {/* Title */}
            <div className="max-w-2xl text-left">
              <PageSubTitle>highlights</PageSubTitle>
              <PageTitle className="!text-4xl">See other Highlights</PageTitle>
            </div>

            {/* Cards */}
            <div className="mt-11 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {related.slice(0, 3).map((post) => (
                <CardType5
                  key={post.id}
                  title={post.title ?? ""}
                  excerpt={post.excerpt ?? ""}
                  imageUrl={post.featuredImage?.node?.sourceUrl ?? undefined}
                  postDate={post.date ?? ""}
                  uri={post.uri ?? undefined}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/**
 * Next.js GraphQL integration
 */
(SingleInsight as any).query = SINGLE_INSIGHT_QUERY;

(SingleInsight as any).variables = (
  seedNode: { slug?: string } = {},
  ctx: GetStaticPropsContext
) => {
  if (!ctx.params?.slug && !seedNode?.slug) {
    throw new Error(
      "SingleInsight.variables: missing slug from params/seedNode."
    );
  }

  const slug =
    (Array.isArray(ctx.params?.slug)
      ? ctx.params?.slug[0]
      : ctx.params?.slug) || seedNode?.slug;

  return { slug };
};
