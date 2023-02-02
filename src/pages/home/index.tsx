import React, {useEffect} from "react";

import {Container} from './styles';

import FriendsCommunites from "../../components/friends-communities";
import Posts from "../../components/posts";
import RPAdvert from "../../components/rp-advert";

import {useAppContext} from "../../contexts/app";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const {resetAppContext, dark} = useAppContext();

  useEffect(() => {
    return () => resetAppContext!();
  }, []);

  return (
    <Container dark={dark}>
      <FriendsCommunites />
      <Posts />
      <RPAdvert />
    </Container>
  );
};

export default HomePage;
