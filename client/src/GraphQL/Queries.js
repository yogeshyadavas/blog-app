import { gql } from "@apollo/client";

export const LOAD_BLOGES = gql`
  query {
    getAllBloges {
      id
      heading
      date 
      content
    }
  }
`;
