import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app"; // Import AppProps
import { FaustProvider } from "@faustwp/core";
import "../styles/globals.css";
import Layout from "@/src/components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Add AppProps type
  const router = useRouter();

  const pageTitle: string | undefined = (Component as any).title;

  return (
    <FaustProvider pageProps={pageProps}>
      <Layout title={pageTitle}>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </FaustProvider>
  );
}
