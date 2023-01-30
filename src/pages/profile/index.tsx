import React from "react";

import {Container} from '../home/styles';

import Posts from "../../components/posts";
import FriendsCommunites from "../../components/friends-communities";
import ProfileSideView from "../../components/profile-sideview";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <Container>
      <FriendsCommunites />
      <Posts />
      <ProfileSideView id="<Dark Knight />" />
    </Container>
  );
};

export default ProfilePage;
