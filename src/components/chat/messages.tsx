import React from "react";

import {MessagesContainer, Message} from "./styles";

interface MessagesProps {}

const Messages: React.FC<MessagesProps> = () => {
    return (
        <MessagesContainer>
            {new Array(42).fill(7).map(() => (
                <Message>
                    <span>Hi there!! How ya doing?</span>
                    <span>2:43 PM 27 Jan 2023</span>
                </Message>
            ))}
        </MessagesContainer>
    );
};

export default Messages;
