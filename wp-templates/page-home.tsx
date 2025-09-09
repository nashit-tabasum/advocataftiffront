import React, { JSX } from "react";
import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import SEO from "@/src/components/SEO";

// Components
import CardType1 from "@/src/components/Cards/CardType1";
import CardType2 from "@/src/components/Cards/CardType2";
import CardType3 from "@/src/components/Cards/CardType3";
import CardType4 from "@/src/components/Cards/CardType4";
import CardType5 from "@/src/components/Cards/CardType5";
import CardType6 from "@/src/components/Cards/CardType6";
import PrimaryButton from "@/src/components/Buttons/PrimaryBtn";
import {
  PageSubTitle,
  PageTitle,
  PageTitleText,
} from "@/src/components/Typography";
import SearchFieldHome from "@/src/components/InputFields/SearchFieldHome";

interface HomePageProps {
  data?: {
    page?: {
      title?: string | null;
      content?: string | null; // Gutenberg HTML
      seo?: {
        title?: string | null;
        metaDesc?: string | null;
        canonical?: string | null;
        opengraphTitle?: string | null;
        opengraphDescription?: string | null;
        opengraphUrl?: string | null;
        opengraphSiteName?: string | null;
        opengraphImage?: { sourceUrl?: string | null } | null;
        twitterTitle?: string | null;
        twitterDescription?: string | null;
        twitterImage?: { sourceUrl?: string | null } | null;
        schema?: { raw?: string | null } | null;
      } | null;
      homeAiSection?: {
        aiTitle?: string | null;
        aiDescription?: string | null;
      } | null;
      homeHeroThumbnail?: {
        homeHeroThumbnail?: {
          heroSectionImage?: { node?: { mediaItemUrl?: string | null } | null };
          heroSectionVideo?: { node?: { mediaItemUrl?: string | null } | null };
        } | null;
      } | null;
    } | null;

    dataSets?: {
      nodes?: Array<{
        id: string;
        uri?: string | null;
        title?: string | null;
        excerpt?: string | null;
        date?: string | null;
        dataSetFields?: {
          dataSetFile?: { node?: { mediaItemUrl?: string | null } | null };
        } | null;
      }> | null;
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
      }> | null;
    } | null;
  };
  loading?: boolean;
}

/** GraphQL query for page, datasets, and insights */
const PAGE_QUERY = gql`
  query GetHomePage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphUrl
        opengraphSiteName
        opengraphImage { sourceUrl }
        twitterTitle
        twitterDescription
        twitterImage { sourceUrl }
        schema { raw }
      }
      homeAiSection {
        aiTitle
        aiDescription
      }
      homeHeroThumbnail {
        homeHeroThumbnail {
          heroSectionImage {
            node {
              mediaItemUrl
            }
          }
          heroSectionVideo {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    dataSets(first: 6) {
      nodes {
        id
        uri
        title
        excerpt
        date
        dataSetFields {
          dataSetFile {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    insights(first: 3) {
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

/** Strip tags and normalize text from Gutenberg HTML */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

/** Extract first heading + first non-empty paragraph */
function extractHeroFromGutenberg(html?: string | null): {
  title?: string;
  description?: string;
} {
  if (!html) return {};
  const h = html.match(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i);
  const title = h ? stripHtml(h[1]) : undefined;

  const pMatches = html.match(/<p\b[^>]*>[\s\S]*?<\/p>/gi) || [];
  let description: string | undefined;
  for (const p of pMatches) {
    const inner = stripHtml(
      p.replace(/^<p\b[^>]*>/i, "").replace(/<\/p>$/i, "")
    );
    if (inner) {
      description = inner;
      break;
    }
  }
  return { title, description };
}

/** Main Home Page component */
export default function PageHome({ data }: HomePageProps): JSX.Element {
  const router = useRouter();
  const homeHeroBg = "/assets/images/patterns/home-hero-bg.jpg";

  const heroHtml = data?.page?.content ?? undefined;
  const { title: heroTitle, description: heroDescription } =
    extractHeroFromGutenberg(heroHtml);

  const heroVideo =
    data?.page?.homeHeroThumbnail?.homeHeroThumbnail?.heroSectionVideo?.node
      ?.mediaItemUrl;
  const heroImage =
    data?.page?.homeHeroThumbnail?.homeHeroThumbnail?.heroSectionImage?.node
      ?.mediaItemUrl;

  return (
    <div className="bg-gray-400 overflow-x-hidden">
      <SEO
        yoast={data?.page?.seo as any}
        title={data?.page?.title ?? heroTitle ?? "Home"}
        description={heroDescription}
      />
      {/* Hero section */}
      <div className="home-hero relative bg-cover bg-center bg-no-repeat text-white h-screen">
        {/* Background Image */}
        <div>
          <img
            src={homeHeroBg}
            width={1628}
            height={700}
            className="h-screen w-full object-cover"
            alt="home-hero-bg"
          />
        </div>

        {/* overlay */}
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background:
              "linear-gradient(0deg, rgba(235, 26, 82, 0.20) 0%, rgba(235, 26, 82, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="hero-block-container px-5 md:px-16 xl:px-20 pt-10 pb-28 md:pt-16 md:pb-16 xl:pt-32 xl:pb-72 relative z-10 mx-auto">
            <div className="hero-block-center text-center mx-auto max-w-6xl grid justify-center">
              {heroTitle && (
                <h1 className="hero-title mb-5 text-slate-50 text-4xl md:text-5xl xl:text-[80px] leading-snug font-family-montserrat font-extrabold max-w-4xl">
                  {heroTitle}
                </h1>
              )}
              {heroDescription && (
                <div className="space-y-2.5">
                  <p className="hero-paragraph text-slate-200 text-base/6 lg:text-lg/7 font-family-montserrat font-normal max-w-3xl mx-auto">
                    {heroDescription}
                  </p>
                </div>
              )}
              <div className="mt-8">
                <SearchFieldHome />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero media (video or image) */}
      {(heroVideo || heroImage) && (
        <div className="bg-white pb-0">
          <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
            <div className="ring-1 ring-black/10 rounded-3xl relative -top-32 md:-top-40 xl:-top-48 z-20 overflow-hidden">
              {heroVideo ? (
                <video
                  src={heroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="rounded-3xl h-full w-full object-cover"
                />
              ) : (
                heroImage && (
                  <img
                    src={heroImage}
                    className="rounded-3xl h-full w-full object-cover"
                    width={1120}
                    height={713}
                    loading="lazy"
                    alt="Home hero"
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dashboards */}
      <div className="bg-white pb-24 sm:pb-32 -mt-18">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <PageSubTitle className="page-sub-title">dashboard</PageSubTitle>
            <PageTitle className="page-title">
              Explore Our advance dashboards
            </PageTitle>
            <PageTitleText className="page-title-text">
              Powered by Advocata’s cutting-edge AI, our platform leverages
              advanced data insights to help you connect with people who share
              your values and interests.
            </PageTitleText>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:gap-8 xl:gap-10 sm:mt-16 xl:grid-cols-7 xl:grid-rows-2">
            <div className="flex p-px xl:col-span-4">
              <CardType1 />
            </div>
            <div className="flex p-px xl:col-span-3">
              <CardType2 />
            </div>
            <div className="flex p-px xl:col-span-3">
              <CardType3 />
            </div>
            <div className="flex p-px xl:col-span-4">
              <CardType4 />
            </div>
          </div>
          
        </div>
      </div>

      {/* AI intro */}
      <div
        className="relative overflow-hidden bg-white py-24 sm:py-32"
        style={{
          background:
            "url('/assets/images/patterns/home-page-bg.jpg') no-repeat center/cover",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
            <div className="lg:pt-4 lg:pr-4 lg:w-2xl">
              <div className="max-w-lg lg:max-w-none">
                {data?.page?.homeAiSection?.aiTitle && (
                  <span className="text-xs font-semibold text-white bg-white/25 py-2 px-3 rounded-full uppercase font-family-sourcecodepro">
                    {data.page.homeAiSection.aiTitle}
                  </span>
                )}
                {data?.page?.homeAiSection?.aiDescription && (
                  <h3 className="mt-5 xl:text-6xl sm:text-5xl text-3xl leading-9 md:leading-14 xl:leading-16 font-normal font-family-montserrat text-pretty text-white">
                    {data.page.homeAiSection.aiDescription}
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Datasets */}
      <div className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <PageSubTitle className="page-sub-title">Datasets</PageSubTitle>
            <PageTitle className="page-title">
              Explore Our Comprehensive Dataset Collection
            </PageTitle>
          </div>
          <div className="mx-auto my-8 md:my-11 grid max-w-2xl grid-cols-1 gap-6 xl:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
            {(data?.dataSets?.nodes ?? []).map((c) => (
              <div key={c.id} className="h-full">
                <CardType6
                  title={c.title ?? ""}
                  excerpt={c.excerpt ?? ""}
                  fileUrl={
                    c.dataSetFields?.dataSetFile?.node?.mediaItemUrl ?? ""
                  }
                  postDate={c.date ?? ""}
                  uri={c.uri ?? undefined}
                />
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-7xl text-center">
            <PrimaryButton onClick={() => router.push("/datasets")}>
              View data catalog
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-pink-100 py-12 md:py-16 xl:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <PageSubTitle className="page-sub-title">Highlights</PageSubTitle>
            <PageTitle className="page-title">
              Up to date with our latest news and updates
            </PageTitle>
          </div>
          <div className="mx-auto my-8 md:my-11 grid max-w-2xl grid-cols-1 gap-6 xl:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
            {(data?.insights?.nodes ?? []).map((c) => (
              <div key={c.id} className="h-full">
                <CardType5
                  title={c.title ?? ""}
                  excerpt={c.excerpt ?? ""}
                  imageUrl={c.featuredImage?.node?.sourceUrl ?? ""}
                  postDate={c.date ?? ""}
                  uri={c.uri ?? undefined}
                  categories={c.insightsCategories?.nodes ?? []}
                />
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-7xl text-center">
            <PrimaryButton onClick={() => router.push("/insights")}>
              Explore more
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Attach query + variables for Next.js data fetching */
(PageHome as any).query = PAGE_QUERY;
(PageHome as any).variables = (
  _seedNode: { databaseId?: number | string } = {},
  ctx: GetStaticPropsContext
) => {
  if (!_seedNode?.databaseId) {
    throw new Error("PageHome.variables: missing databaseId from seed node.");
  }
  return {
    databaseId: String(_seedNode.databaseId),
    asPreview: !!ctx?.preview,
  };
};
