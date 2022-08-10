import { gql } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

import { appContext } from "../../context";

// 0xd44c882bbd43fc4bce407ae0db779cfee785dc109ca8310145fa875f7f4e9245
// ethtoronto2022_hacker1

// 0x8eecc745621e7f0ce18543a98193c3c77b43244ef3b5c46cf5ffdb134ecd5d06
// ethtoronto2022_hacker3

interface AccountAttribute {
  key: string;
  value: string;
}

interface AccountProps {
  attributes: AccountAttribute[];
  bio: string;
  coverPicture: {
    original: {
      url: string;
    };
  };
  handle: string;
  name: string;
  picture: {
    original: {
      url: string;
    };
  };
}

const Profile: React.FC = () => {
  const { apolloClient } = React.useContext(appContext).state;

  const [profile, setProfile] = React.useState<AccountProps | undefined>();

  const params = useParams();

  const profileId = params.profileId;

  React.useEffect(() => {
    console.log("use effect");
    apolloClient
      .query({
        query: gql(GET_PROFILE),
        variables: {
          request: {
            handle: profileId,
          },
        },
      })
      .then((data) => {
        console.log(data.data.profile);
        setProfile(data.data.profile);
      });
  }, []);

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center">{profile?.name}'s Profile</h2>

          <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
              <div className="md:h-80 flex flex-col sm:flex-row bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full sm:w-1/2 lg:w-2/5 h-48 sm:h-auto order-first sm:order-none bg-gray-300">
                  <img
                    src={profile?.picture.original.url}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="w-full sm:w-1/2 lg:w-3/5 flex flex-col p-4 sm:p-8">
                  <h2 className="text-gray-800 text-xl md:text-2xl lg:text-4xl font-bold mb-4">Links:</h2>

                  {profile?.attributes
                    .filter((val) => val.key != "isBeta" && val.key != "app")
                    .map((val) => {
                      return (
                        <p>
                          {val.key}: {val.value}
                        </p>
                      );
                    })}

                  <div className="mt-auto">
                    <a
                      href="#"
                      className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 text-gray-800 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                    >
                      Follow
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center">Current Livestream</h2>

          <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
              <video className="mx-auto" preload="auto" width="600" height="400" controls>
                Stream starting soon.
              </video>
            </div>
            <div className="mx-auto pt-4">
              <p className="text-center">Stream starting soon ...</p>
            </div>
          </div>
        </div>
      </div>
      {/* <p>
        na
        <a
          href="#"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
          onClick={async (): Promise<void> => {
            const apiKey = "3f9b72bf-f328-496c-ab47-e49cc26d2cda";

            const response = await axios.post("https://livepeer.studio/api/stream", {
              headers: JSON.stringify({
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              }),
              data: JSON.stringify({
                name: "test_stream",
                profiles: [
                  {
                    name: "720p",
                    bitrate: 2000000,
                    fps: 30,
                    width: 1280,
                    height: 720,
                  },
                  {
                    name: "480p",
                    bitrate: 1000000,
                    fps: 30,
                    width: 854,
                    height: 480,
                  },
                  {
                    name: "360p",
                    bitrate: 500000,
                    fps: 30,
                    width: 640,
                    height: 360,
                  },
                ],
              }),
            });
            console.log(JSON.stringify(response.data));
          }}
        >
          Create Livestream
        </a>
      </p> */}
    </>
  );
};

const GET_PROFILE = `
  query($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
            type
          }
          ... on RevertFollowModuleSettings {
            type
          }
        }
    }
  }
`;

export default Profile;
