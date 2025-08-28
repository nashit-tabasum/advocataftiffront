import React, { JSX } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";

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

const PAGE_QUERY = gql`
  query GetHomePage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      homeAiSection {
        aiTitle
        aiDescription
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
      }
    }
  }
`;

interface HomePageProps {
  data?: {
    page?: {
      title?: string | null;
      content?: string | null;
      homeAiSection?: {
        aiTitle?: string | null;
        aiDescription?: string | null;
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
          dataSetFile?: {
            node?: { mediaItemUrl?: string | null } | null;
          } | null;
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
      }> | null;
    } | null;
  };
  loading?: boolean;
}

export default function PageHome({ data }: HomePageProps): JSX.Element {
  const homeHeroBg = "/assets/images/patterns/home-hero-bg.jpg";
  const imageSectionSrc = "/assets/images/home-img.jpg";

  return (
    <div className="bg-gray-400 overflow-x-hidden">
      {/* Hero Section Start */}
      <div className="home-hero relative bg-cover bg-center bg-no-repeat text-white">
        {/* Background Image */}
        <div>
          <img
            src={homeHeroBg}
            width={1628}
            height={700}
            className="h-full w-full object-cover"
            alt="about-hero-img.jpg"
          />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(235, 26, 82, 0.20) 0%, rgba(235, 26, 82, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%)",
          }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-5 md:px-10 xl:px-16 py-12 md:py-16 xl:py-20 mx-auto w-full">
            <div className="text-center mx-auto max-w-6xl grid place-items-center">
              <h1 className="mb-5 md:mb-0 text-slate-50 text-4xl md:text-5xl xl:text-6xl leading-snug font-montserrat font-bold max-w-5 xl:max-w-sm">
                Connecting the dots on Public Data
              </h1>
              <div className="space-y-2.5">
                <p className="text-slate-200 text-base/6 lg:text-lg/7 font-playfair font-normal max-w-2xl">
                  Powered by Advocata’s cutting-edge AI, our platform leverages
                  advanced data insights to help you connect with people who
                  share your values and interests.
                </p>
              </div>
              {/* Search Form */}
              <div className="pb-8 w-full max-w-2xl">
                <SearchFieldHome />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section End */}

      {/* Image Section Start */}
      <div className="bg-white pb-0">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="ring-1 ring-black/10 rounded-3xl relative -top-32 md:-top-40 xl:-top-48 z-20">
            <img
              src={imageSectionSrc}
              className="rounded-3xl h-full w-full object-cover"
              width={1120}
              height={713}
              loading="lazy"
              alt="Home Image"
            />
          </div>
        </div>
      </div>
      {/* Image Section End */}

      {/* Advance Dashboard Section Start */}
      <div className="bg-white pb-24 sm:pb-32 -mt-18">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <PageSubTitle className="page-sub-title">dashboard</PageSubTitle>
            <PageTitle className="page-title">
              Explore Our advance dashboards
            </PageTitle>
            <PageTitleText className="page-title-text !text-slate-800 ">
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
      {/* Advance Dashboard Section End */}

      {/* Introduction of AI Section Start */}
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
                <span className="text-xs font-semibold text-white bg-white/25 py-2 px-3 rounded-full uppercase font-manrope">
                  {data?.page?.homeAiSection?.aiTitle || "Default AI Title"}
                </span>
                <h2
                  className="mt-5 xl:text-6xl sm:text-5xl text-3xl leading-9 md:leading-14 xl:leading-16 font-normal font-playfair text-pretty text-white"
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.page?.homeAiSection?.aiDescription ||
                      "Default AI description text.",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Introduction of AI Section End */}

      {/* Dataset Section Start */}
      <div className="bg-white py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <PageSubTitle className="page-sub-title">Datasets</PageSubTitle>
            <PageTitle className="page-title">
              <>
                Explore Our <br /> <span>Comprehensive Dataset</span> <br />{" "}
                Collection
              </>
            </PageTitle>
          </div>
          <div className="mx-auto my-8 md:my-11 grid max-w-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 lg:max-w-none">
            {(data?.dataSets?.nodes ?? []).map((c) => (
              <Link href={c.uri ?? "#"} key={c.id} className="block h-full">
                <CardType6
                  title={c.title ?? ""}
                  excerpt={c.excerpt ?? ""}
                  fileUrl={
                    c.dataSetFields?.dataSetFile?.node?.mediaItemUrl ?? ""
                  }
                  postDate={c.date ?? ""}
                />
              </Link>
            ))}
          </div>
          <div className="mx-auto max-w-7xl text-center">
            <PrimaryButton href="/datasets">View data catalog</PrimaryButton>
          </div>
        </div>
      </div>
      {/* Dataset Section End */}

      {/* Insights Section Start */}
      <div className="bg-pink-100 py-12 md:py-16 xl:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <PageSubTitle className="page-sub-title">Highlights</PageSubTitle>
            <PageTitle className="page-title">
              Up to date with our latest news and updates
            </PageTitle>
          </div>
          <div className="mx-auto my-8 md:my-11 grid max-w-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 lg:max-w-none">
            {(data?.insights?.nodes ?? []).map((c) => (
              <Link href={c.uri ?? "#"} key={c.id} className="block h-full">
                <CardType5
                  title={c.title ?? ""}
                  excerpt={c.excerpt ?? ""}
                  imageUrl={c.featuredImage?.node?.sourceUrl ?? ""}
                  postDate={c.date ?? ""}
                />
              </Link>
            ))}
          </div>
          <div className="mx-auto max-w-7xl text-center">
            <PrimaryButton href="/insights">Explore more</PrimaryButton>
          </div>
        </div>
      </div>
      {/* Insights Section End */}
    </div>
  );
}

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
