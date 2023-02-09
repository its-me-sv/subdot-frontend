import React, {useEffect} from "react";

import {Container} from './styles';

import FriendsCommunites from "../../components/friends-communities";
import Posts from "../../components/posts";
import RPAdvert from "../../components/rp-advert";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const {resetAppContext, dark} = useAppContext();
  const {account} = useUserContext();

  useEffect(() => {
    return () => resetAppContext!();
  }, []);

  return (
    <Container dark={dark}>
      <FriendsCommunites accountId={account?.address} />
      <Posts accountId={account?.address} />
      <RPAdvert />
    </Container>
  );
};

export default HomePage;
