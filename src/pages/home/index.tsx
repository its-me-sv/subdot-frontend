import React from "react";

import {Container} from './styles';

import FriendsCommunites from "../../components/friends-communities";
import Posts from "../../components/posts";
import RPAdvert from "../../components/rp-advert";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Container>
      <FriendsCommunites />
      <Posts />
      <RPAdvert />
    </Container>
  );
};

export default HomePage;
