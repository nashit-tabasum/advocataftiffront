import Head from "next/head";
import { useQuery } from "@apollo/client";
import { SITE_DATA_QUERY } from "../../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../../queries/MenuQueries";
import Footer from "./footer";
import {
  Inter,
  Manrope,
  Montserrat,
  Source_Code_Pro,
  Baskervville,
  Playfair_Display,
} from "next/font/google";
import HeaderNav from "./header";
import BrandLogo from "../../public/assets/images/logos/brand-logo.svg";
import navbarImg from "../../public/assets/images/nav-dropdown-img.jpg";

type Props = { title?: string; children: React.ReactNode };

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-sourcecodepro",
});
const baskervville = Baskervville({
  subsets: ["latin"],
  variable: "--font-baskervville",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function Layout({ title, children }: Props) {
  const { data: site } = useQuery(SITE_DATA_QUERY, {
    fetchPolicy: "cache-first",
  });
  const { data: menu } = useQuery(HEADER_MENU_QUERY, {
    fetchPolicy: "cache-first",
  });

  const siteTitle = site?.generalSettings?.title ?? "";
  const siteDescription = site?.generalSettings?.description ?? "";
  const menuItems = menu?.primaryMenuItems?.nodes ?? [];

  return (
    <div
      className={[
        inter.variable,
        manrope.variable,
        montserrat.variable,
        sourceCodePro.variable,
        baskervville.variable,
        playfair.variable,
        "font-sans",
      ].join(" ")}
    >
      <Head>
        <title>{title ? `${title} - ${siteTitle}` : siteTitle}</title>
        {siteDescription && (
          <meta name="description" content={siteDescription} />
        )}
      </Head>

      <HeaderNav
        logoSrc={BrandLogo.src}
        navDropdownImage={navbarImg.src}
        onSearch={(q) => console.log("search:", q)}
      />
      {children}

      <Footer />
    </div>
  );
}
