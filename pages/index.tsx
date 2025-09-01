import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import type { GetStaticPropsContext } from "next";

export default function Index(props: any) {
  return <WordPressTemplate {...props} />;
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const props = await getWordPressProps({ ctx });
  return { ...props, revalidate: 120 };
}
