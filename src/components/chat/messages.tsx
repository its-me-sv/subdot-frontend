import React from "react";

import {MessagesContainer} from "./styles";

import { DBMessage } from "../../utils/types";
import Message from "./message";

interface MessagesProps {
  messages: Array<DBMessage>;
}

const Messages: React.FC<MessagesProps> = ({messages}) => {
    return (
        <MessagesContainer>
            {messages.map(
                message => <Message key={message.message_id} message={message}/>
            )}
        </MessagesContainer>
    );
};

export default Messages;
