import { gql } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

import { appContext } from "../../context";

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) {
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
            __typename
    }
 }`;

// 0xd44c882bbd43fc4bce407ae0db779cfee785dc109ca8310145fa875f7f4e9245
// ethtoronto2022_hacker1

const Profile: React.FC = () => {
  const { apolloClient } = React.useContext(appContext).state;

  const params = useParams();

  if (params.profileId == "hacker1") {
    console.log(
      apolloClient.mutate({
        mutation: gql(CREATE_PROFILE),
        variables: {
          request: {
            handle: "ethtoronto2022_hacker2",
            profilePictureUri: null,
            followNFTURI: null,
            followModule: null,
          },
        },
      })
    );
  }

  return <p>na</p>;
};

export default Profile;
