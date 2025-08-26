import { gql } from '@apollo/client';

export const DATASET_QUERY = gql`
  query GetDatasets {
  datasets {
    nodes {
      title
      datasetFieldGroup {
        datasetTitle
        datasetDescription
        datasetImage {
          node {
          sourceUrl
          altText 
          }
        }
      }
    }
  }
}
`;
