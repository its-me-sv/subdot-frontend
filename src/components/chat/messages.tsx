import React from "react";

import {MessagesContainer, Message} from "./styles";

import {useAppContext} from "../../contexts/app";
import { DBMessage } from "../../utils/types";

interface MessagesProps {
  messages: Array<DBMessage>;
}

const Messages: React.FC<MessagesProps> = ({messages}) => {
    const {dark} = useAppContext();

    return (
        <MessagesContainer>
            {messages.map((message) => (
                <Message key={message.message_id} dark={dark}>
                    <span>{message.ipfs_content_id}</span>
                    <span>{message.created_at}</span>
                </Message>
            ))}
        </MessagesContainer>
    );
};

export default Messages;
