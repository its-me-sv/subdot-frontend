import React from "react";

import {Container} from "./styles";

import MessageInput from "./input";
import Messages from "./messages";
import SectionProfile from "../friends-communities/profile";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
    return (
        <Container>
            <SectionProfile id="<DarK Knight />" hover />
            <Messages />
            <MessageInput />
        </Container>
    );
};

export default Chat;
