// pages/_app.tsx
import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { FaustProvider } from "@faustwp/core";
import "../styles/globals.css";

import HeaderNav from "@/src/components/header";
import Footer from "@/src/components/footer";

import BrandLogo from "@/public/assets/images/logos/brand-logo.svg";
import navbarImg from "@/public/assets/images/nav-dropdown-img.jpg";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <HeaderNav
        logoSrc={BrandLogo.src}
        navDropdownImage={navbarImg.src}
        onSearch={(q) => console.log("search:", q)}
      />

      <Component {...pageProps} key={router.asPath} />

      <Footer />
    </FaustProvider>
  );
}
