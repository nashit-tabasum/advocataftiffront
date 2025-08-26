import { gql } from "@apollo/client";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import Layout from "../src/components/Layout";
import EntryHeader from "../src/components/EntryHeader";

export const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;

interface SinglePageProps {
  data?: {
    page?: {
      title?: string | null;
      content?: string | null;
    } | null;
  };
  loading?: boolean;
}

export default function SinglePage({ data, loading }: SinglePageProps) {
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 flex justify-center py-20">
        Loading...
      </div>
    );
  }

  const page = data?.page;
  if (!page) {
    return <p>No page data returned.</p>;
  }

  const { title, content = "" } = page;
  const safeTitle: string = title ?? "";

  return (
    <>
      <Head>
        <title>{safeTitle}</title>
      </Head>
      <main className="max-w-6xl mx-auto px-4">
        <EntryHeader title={title ?? undefined} />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content ?? "" }}
        />
      </main>
    </>
  );
}

// ✅ Faust-style static query injection
(SinglePage as any).query = PAGE_QUERY;

(SinglePage as any).variables = (
  seedNode: { databaseId?: number | string } = {},
  ctx: GetStaticPropsContext
) => {
  const databaseId = seedNode?.databaseId;
  if (!databaseId) {
    throw new Error("SinglePage.variables: missing databaseId.");
  }

  return {
    databaseId: String(databaseId),
    asPreview: !!ctx?.preview,
  };
};
