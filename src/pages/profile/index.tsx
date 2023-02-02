import React from "react";

import {Container} from '../home/styles';

import Posts from "../../components/posts";
import FriendsCommunites from "../../components/friends-communities";
import ProfileSideView from "../../components/profile-sideview";

import {useAppContext} from "../../contexts/app";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const {dark} = useAppContext();

  return (
    <Container dark={dark}>
      <FriendsCommunites />
      <Posts />
      <ProfileSideView id="<Dark Knight />" />
    </Container>
  );
};

export default ProfilePage;
