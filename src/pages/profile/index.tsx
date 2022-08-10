import React from "react";
import { useParams } from "react-router-dom";

const Profile: React.FC = () => {
  const params = useParams();

  return <div>Profile: {params.profileId}</div>;
};

export default Profile;
