import React from "react";

import {Container} from "../home/styles";

import FriendsCommunites from "../../components/friends-communities";
import AdvertSideView from "../../components/advert-sideview";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
    return (
        <Container>
            <FriendsCommunites />
            <div>CHAT</div>
            <AdvertSideView />
        </Container>
    );
};

export default ChatPage;