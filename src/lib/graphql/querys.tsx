import { gql } from "@apollo/client";

const GET_TRACKS = gql`
  query AccountInfo {
    accountInfo(userId: "66994ae0c5ad1d7392bc679c") {
      _id
      name
      email
      avatar
      role
      bio
      createdAt
      updatedAt
    }
  }
`;

export { GET_TRACKS };
