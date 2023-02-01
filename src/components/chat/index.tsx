import React from "react";

import {Container} from "./styles";

import MessageInput from "./input";
import Messages from "./messages";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
    return (
        <Container>
            <Messages />
            <MessageInput />
        </Container>
    );
};

export default Chat;
