import Head from "next/head";

type YoastImage = { sourceUrl?: string | null } | null | undefined;
type YoastSchema = { raw?: string | null } | null | undefined;

export type YoastSEO = {
  title?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphUrl?: string | null;
  opengraphSiteName?: string | null;
  opengraphImage?: YoastImage;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: YoastImage;
  schema?: YoastSchema;
} | null;

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  yoast?: YoastSEO;
};

export default function SEO({ title, description, canonical, yoast }: Props) {
  const theTitle = (yoast?.title ?? title) || undefined;
  const theDesc = (yoast?.metaDesc ?? description) || undefined;
  const theCanonical = (yoast?.canonical ?? canonical) || undefined;
  const ogTitle = (yoast?.opengraphTitle ?? theTitle) || undefined;
  const ogDesc = (yoast?.opengraphDescription ?? theDesc) || undefined;
  const ogUrl = yoast?.opengraphUrl || theCanonical || undefined;
  const ogSiteName = yoast?.opengraphSiteName || undefined;
  const ogImage = yoast?.opengraphImage?.sourceUrl || undefined;
  const twTitle = (yoast?.twitterTitle ?? theTitle) || undefined;
  const twDesc = (yoast?.twitterDescription ?? theDesc) || undefined;
  const twImage = yoast?.twitterImage?.sourceUrl || ogImage || undefined;
  const schemaRaw = yoast?.schema?.raw || undefined;

  return (
    <Head>
      {theTitle && <title>{theTitle}</title>}
      {theDesc && <meta name="description" content={theDesc} />}
      {theCanonical && <link rel="canonical" href={theCanonical} />}

      {/* Open Graph */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDesc && <meta property="og:description" content={ogDesc} />}      
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      {(twTitle || twDesc || twImage) && (
        <meta name="twitter:card" content={twImage ? "summary_large_image" : "summary"} />
      )}
      {twTitle && <meta name="twitter:title" content={twTitle} />}
      {twDesc && <meta name="twitter:description" content={twDesc} />}
      {twImage && <meta name="twitter:image" content={twImage} />}

      {/* Yoast JSON-LD Schema */}
      {schemaRaw && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaRaw }}
        />
      )}
    </Head>
  );
}
