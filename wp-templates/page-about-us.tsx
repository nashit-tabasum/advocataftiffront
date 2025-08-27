import { gql } from "@apollo/client";
import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import Accordion from "../src/components/Accordion";
import TextBlock from "../src/components/TextBlock";
import { PageSubTitle, PageTitle } from "@/src/components/Typography";

const PAGE_QUERY = gql`
  query GetAboutPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;

interface AboutPageProps {
  data?: {
    page?: {
      title?: string | null;
      content?: string | null;
    } | null;
  };
  loading?: boolean;
}

export default function AboutPage({ data }: AboutPageProps) {
  const page = data?.page;
  if (!page) return <p>About page not found.</p>;

  const title = page?.title ?? "About Us";
  const html: string = page?.content ?? "";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="bg-gray-400 overflow-x-hidden">
        {/* Hero Section Start */}
        <div className="about-hero relative">
          <div>
            <img
              src={"/assets/images/about-hero-img.jpg"}
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
                "linear-gradient(0deg, rgba(235, 26, 82, 0.16) 0%, rgba(235, 26, 82, 0.16) 100%)",
            }}
          />
        </div>
        {/* Hero Section End */}

        {/* Text Block Section Start */}
        <div className="bg-white">
          {/* Use the provided TextBlock component inside this section */}
          <TextBlock
            subtitle="who we are"
            title="Inspiring progress in Sri Lanka"
            paragraphs={[
              "From its beginnings in 1843, when The Economist newspaper was founded by a Scottish hat manufacturer to further the cause of free trade, The Economist Group has evolved into a staunchly independent global media and information-services company with intelligent brands for an international audience.",
              "Over time, the newspaper has helped readers grasp the great drivers of change, from technology to geopolitics, finance and economics. It added a dedicated section on the United States in 1942 and a China section in 2012. It expanded successfully into North America, which became its largest market. To serve decision-makers in businesses and beyond, the Economist Intelligence Unit (EIU) became a leader in country analysis and forecasting. Live events around the world brought global thought-leaders together to discuss critical topics at roundtables and summits.",
            ]}
            // ensure the outer container also carries the layout classes
            className="mx-auto max-w-7xl px-5 md:px-10 xl:px-24"
          />
        </div>
        {/* Text Block Section End */}

        {/* Accordion Section Start */}
        <div className="relative overflow-hidden py-24 sm:py-32 bg-brand-2-900">
          {/* style="background: url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/accordion-bg-img.jpg' ); ?>'); background-repeat: no-repeat; background-size: cover; background-position: center;" */}
          <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <PageSubTitle className="!text-slate-50">FAQ</PageSubTitle>
              <PageTitle className="!text-slate-50">
                How we can help you?
              </PageTitle>
            </div>

            <Accordion
              className="mx-auto max-w-4xl"
              defaultOpenIndex={0}
              items={[
                {
                  title: (
                    <span className="text-lg/7 md:text-xl/7 font-family-montserrat font-medium">
                      Lorem ipsum dolor sit amet?
                    </span>
                  ),
                  content: (
                    <p className="text-base/6 md:text-lg/7 pt-4 max-w-72 md:max-w-xl">
                      Pellentesque at lacus ut arcu volutpat vulputate. Aenean
                      gravida tincidunt arcu ut tincidunt. Fusce in vehicula
                      risus. Sed scelerisque risus in mollis tincidunt.
                      Vestibulum interdum nibh vulputate felis viverra
                      dignissim.
                    </p>
                  ),
                },
                {
                  title: (
                    <span className="text-lg/7 md:text-xl/7 font-family-montserrat font-medium">
                      Lorem ipsum dolor sit amet?
                    </span>
                  ),
                  content: (
                    <p className="text-base/6 md:text-lg/7 pt-4 max-w-72 md:max-w-xl">
                      Pellentesque at lacus ut arcu volutpat vulputate. Aenean
                      gravida tincidunt arcu ut tincidunt. Fusce in vehicula
                      risus. Sed scelerisque risus in mollis tincidunt.
                      Vestibulum interdum nibh vulputate felis viverra
                      dignissim.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
        {/* Accordion Section End */}
      </div>
    </>
  );
}

// Faust static query configuration
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
