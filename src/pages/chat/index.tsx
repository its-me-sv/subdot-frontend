import React from "react";

import {Container} from "../home/styles";

import FriendsCommunites from "../../components/friends-communities";
import AdvertSideView from "../../components/advert-sideview";
import Chat from "../../components/chat";

import {useAppContext} from "../../contexts/app";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
    const {dark} = useAppContext();
    
    return (
      <Container dark={dark}>
        <FriendsCommunites />
        <Chat />
        <AdvertSideView />
      </Container>
    );
};

export default ChatPage;