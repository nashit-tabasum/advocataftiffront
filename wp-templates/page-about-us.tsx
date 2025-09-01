// pages/about-us.tsx
import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import React from "react";
import Accordion from "../src/components/Accordion";
import { PageSubTitle, PageTitle } from "@/src/components/Typography";

/* ── Types ─────────────────────────────────────────────── */

interface GutenbergBlock {
  name?: string | null; // e.g. "core/heading", "core/paragraph"
  renderedHtml?: string | null; // HTML from WPGraphQL Content Blocks
}

interface AboutPageProps {
  data?: {
    page?: {
      title?: string | null;
      content?: string | null;

      // Gutenberg blocks
      editorBlocks?: GutenbergBlock[] | null;

      // ACF sections
      aboutIntroSection?: {
        aboutIntroTitle?: string | null;
        aboutIntroDescription?: string | null;
      } | null;
      aboutFaqSection?: {
        aboutFaqDetails?: Array<{
          aboutFaqItemTitle?: string | null;
          aboutFaqItemDescription?: string | null;
        }> | null;
      } | null;
      aboutHeroSection?: {
        aboutUsHeroBackgroundImage?: {
          node?: {
            sourceUrl?: string | null;
            altText?: string | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
  loading?: boolean;
}

/* ── GraphQL ──────────────────────────────────────────── */

const PAGE_QUERY = gql`
  query GetAboutPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content

      # Matches your Home page approach
      editorBlocks {
        name
        renderedHtml
      }

      # ACF (fallbacks + other sections)
      aboutIntroSection {
        aboutIntroTitle
        aboutIntroDescription
      }
      aboutFaqSection {
        aboutFaqDetails {
          aboutFaqItemTitle
          aboutFaqItemDescription
        }
      }
      aboutHeroSection {
        aboutUsHeroBackgroundImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/* ── UI bits ──────────────────────────────────────────── */

function AboutHero({
  image,
}: {
  image?: { sourceUrl?: string | null; altText?: string | null };
}) {
  if (!image?.sourceUrl) return null;
  return (
    <div className="about-hero relative">
      <div>
        <img
          src={image.sourceUrl}
          width={1628}
          height={700}
          className="h-full w-full object-cover"
          alt={image.altText || ""}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(235, 26, 82, 0.16) 0%, rgba(235, 26, 82, 0.16) 100%)",
        }}
      />
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */

export default function AboutPage({ data }: AboutPageProps) {
  const page = data?.page;

  // Hero image (ACF)
  const heroImage =
    page?.aboutHeroSection?.aboutUsHeroBackgroundImage?.node ?? undefined;

  // Intro content from Gutenberg with ACF fallbacks
  const introHeadingHTML =
    page?.editorBlocks?.find((b) => b?.name === "core/heading")?.renderedHtml ??
    page?.aboutIntroSection?.aboutIntroTitle ??
    "";

  const introParagraphHTML =
    page?.editorBlocks?.find((b) => b?.name === "core/paragraph")
      ?.renderedHtml ??
    page?.aboutIntroSection?.aboutIntroDescription ??
    "";

  // FAQ (ACF)
  const faqItems =
    page?.aboutFaqSection?.aboutFaqDetails?.map((item) => ({
      title: item?.aboutFaqItemTitle ?? "",
      content: item?.aboutFaqItemDescription ?? "",
    })) ?? [];

  return (
    <main>
      <div className="overflow-x-hidden">
        {/* Hero */}
        <AboutHero image={heroImage} />

        <section className="mx-auto max-w-7xl px-5 md:px-10 xl:px-24 py-16 md:py-20">
          <div className="text-left">
            <span className="uppercase text-xs tracking-wide text-slate-500">
              who we are
            </span>

            <div className="mt-4">
              <div
                role="heading"
                aria-level={2}
                className="text-3xl md:text-4xl xl:text-5xl font-playfair font-semibold"
                dangerouslySetInnerHTML={{ __html: introHeadingHTML }}
              />
            </div>

            <div className="mt-6 max-w-3xl">
              <div
                className="text-slate-700 text-base/6 md:text-lg/7"
                dangerouslySetInnerHTML={{ __html: introParagraphHTML }}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative overflow-hidden py-24 sm:py-32 bg-brand-2-900">
          <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <PageSubTitle className="!text-slate-50">FAQ</PageSubTitle>
              <PageTitle className="!text-slate-50">
                How can we help you?
              </PageTitle>
            </div>

            <div className="mx-auto max-w-4xl mt-10">
              <Accordion
                className="w-full"
                defaultOpenIndex={0}
                items={faqItems.map((item) => ({
                  title: (
                    <span className="text-lg/7 md:text-xl/7 font-family-montserrat font-medium">
                      {item.title}
                    </span>
                  ),
                  content: (
                    <p className="text-base/6 md:text-lg/7 pt-4 max-w-72 md:max-w-xl">
                      {item.content}
                    </p>
                  ),
                }))}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

(AboutPage as any).query = PAGE_QUERY;
(AboutPage as any).variables = (
  seedNode: { databaseId?: number | string } = {},
  ctx: GetStaticPropsContext
) => {
  if (!seedNode?.databaseId) {
    throw new Error("AboutPage.variables: missing databaseId from seed node.");
  }
  return {
    databaseId: String(seedNode.databaseId),
    asPreview: !!ctx?.preview,
  };
};
