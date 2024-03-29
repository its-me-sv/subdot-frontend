import React, {useEffect} from "react";

import {Container} from "../home/styles";

import FriendsCommunites from "../../components/friends-communities";
import Chat from "../../components/chat";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import Advert from "../../components/rp-advert/advert";
import { useLocation } from "react-router-dom";
import { useChatContext } from "../../contexts/chat";
import { DefaultContainer } from "../../components/chat/styles";
import { chooseAcc } from "../../translations/chat";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
    const {dark, language, adverts} = useAppContext();
    const {account} = useUserContext();
    const location = useLocation();
    const {setCurrChat, currChat} = useChatContext();

    useEffect(() => {
      window.document.title = `Subchat / Subdot`;
    }, [language]);

    useEffect(() => {
      if (!location.state) return;
      setCurrChat!(location.state.address as string);
    }, [location.state]);

    return (
      <Container dark={dark}>
        <FriendsCommunites accountId={account?.address} fromChat />
        {currChat.length > 0 ? (
          <Chat key={currChat} address={currChat} />
        ) : (
          <DefaultContainer dark={dark}>
            <span>{chooseAcc[language]}</span>
          </DefaultContainer>
        )}
        {adverts.length > 0 && <Advert advert={adverts[0]} />}
      </Container>
    );
};

export default ChatPage;