import { gql } from "@apollo/client";

export const TEST_QUERY = gql`
  query GetTestPage($id: ID!, $asPreview: Boolean = false) {
    page(id: $id, idType: URI, asPreview: $asPreview) {
      title
      testGroup {
        sampleTextArea
        sampleImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;
