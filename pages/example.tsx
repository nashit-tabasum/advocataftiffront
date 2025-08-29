import Head from "next/head";
import HeaderNav from "@/src/components/header"; // make sure the casing matches the file name (header.tsx)
import Footer from "@/src/components/footer";

export function getStaticProps() {
  return { props: {}, revalidate: 120 }; // ISR, optional
}

export default function Page() {
  const siteTitle = "Advocata"; // change if you want a different title

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <HeaderNav
        logoSrc="/logo.svg" // TODO: replace with your real logo path/URL
        navDropdownImage="/images/nav.jpg" // TODO: replace with your dashboard bg image
        onSearch={(q) => {
          // optional: wire this to your search route
          window.location.href = `/search?s=${encodeURIComponent(q)}`;
        }}
        className="shadow-md"
      />

      <main className="max-w-6xl mx-auto px-4 py-10 text-white">
        <h1 className="text-3xl font-bold mb-4">Example Page</h1>
        <p>Next.js pages are still supported!</p>
      </main>

      <Footer />
    </>
  );
}
