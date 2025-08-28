import { gql } from "@apollo/client";

export const HEADER_MENU_QUERY = gql`
query GetHeaderMenu {
  menu(id: "Main Menu", idType: NAME) {
    id
    name
    menuItems(first: 200) {
      nodes {
        id
        label
        uri
        parentId
      }
    }
  }
}
`;

export const FOOTER_MENU_QUERY = gql`
query GetFooterMenu {
  menu(id: "Footer", idType: NAME) {
    id
    name
    menuItems {
      nodes {
        id
        label
        uri
        parentId
      }
    }
  }
}
`;