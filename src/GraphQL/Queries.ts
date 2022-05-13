import { gql } from '@apollo/client';

export const GET_ATTRIBUTE_BY_SLUG = gql`
  query MyQuery($id: ID!) {
    paAvailability(id: $id, idType: SLUG) {
      id
      name
      slug
      count
      databaseId
      taxonomy {
        node {
          label
          name
        }
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query MyQuery($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      databaseId
      name
      slug
    }
  }
`;