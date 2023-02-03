import React from "react";

import {MessagesContainer, Message} from "./styles";

import {useAppContext} from "../../contexts/app";

interface MessagesProps {}

const Messages: React.FC<MessagesProps> = () => {
    const {dark} = useAppContext();

    return (
        <MessagesContainer>
            {new Array(42).fill(7).map(() => (
                <Message dark={dark}>
                    <span>Hi there!! How ya doing?</span>
                    <span>2:43 PM 27 Jan 2023</span>
                </Message>
            ))}
        </MessagesContainer>
    );
};

export default Messages;
