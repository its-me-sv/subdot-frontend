import React, {useEffect} from "react";

import {Container} from "../home/styles";
import {chatPage} from "../../translations/page-titles";

import FriendsCommunites from "../../components/friends-communities";
import AdvertSideView from "../../components/advert-sideview";
import Chat from "../../components/chat";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import Advert from "../../components/rp-advert/advert";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
    const {dark, language} = useAppContext();
    const {account} = useUserContext();

    useEffect(() => {
      window.document.title = `${chatPage[language]} • Subdot`;
    }, [language]);
    
    return (
      <Container dark={dark}>
        <FriendsCommunites accountId={account?.address} />
        <Chat />
        <Advert />
      </Container>
    );
};

export default ChatPage;