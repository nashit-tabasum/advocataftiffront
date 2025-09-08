import { algoliasearch } from "algoliasearch"; // valid named import in v5+

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string
);

export default searchClient;
