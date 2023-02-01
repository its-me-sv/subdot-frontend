import React from "react";

import {Container} from "../home/styles";

import FriendsCommunites from "../../components/friends-communities";
import AdvertSideView from "../../components/advert-sideview";
import Chat from "../../components/chat";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
    return (
        <Container>
            <FriendsCommunites />
            <Chat />
            <AdvertSideView />
        </Container>
    );
};

export default ChatPage;