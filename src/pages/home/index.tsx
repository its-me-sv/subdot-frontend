import React, {useEffect} from "react";

import {Container} from './styles';
import {homePage} from "../../translations/page-titles";

import FriendsCommunites from "../../components/friends-communities";
import Posts from "../../components/posts";
import RPAdvert from "../../components/rp-advert";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import { useChatContext } from "../../contexts/chat";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const {resetAppContext, dark, language} = useAppContext();
  const {account, spaceId} = useUserContext();
  const {resetChat} = useChatContext();

  useEffect(() => {
    window.document.title = `${homePage[language]} • Subdot`;
    resetChat!();
    return () => resetAppContext!();
  }, []);

  return (
    <Container dark={dark}>
      <FriendsCommunites accountId={account?.address} />
      <Posts 
        accountId={account?.address} 
        spcId={spaceId.toString()}
        home
      />
      <RPAdvert />
    </Container>
  );
};

export default HomePage;
