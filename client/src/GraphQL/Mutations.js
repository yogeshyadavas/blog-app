import { gql } from "@apollo/client";

export const CREATE_BLOG_MUTATION = gql`
  mutation createBlog(
    $data: CreateType!
  ) {
    createBlog(
      data: $data
    ) {
      id
    }
  }
`;

export const UPDATE_BLOG_MUTATION = gql `
  mutation updateBlog(
    $data:UpdateType!
  ) {
    updateBlog(
      data: $data
    ) {
      id
    }
  }
`;


export const DELETE_BLOG_MUTATION = gql`
  mutation deleteBlog(
    $id: Int!
  ) {
    deleteBlog(
      id: $id
    ) {
      id
    }
  }
`;
