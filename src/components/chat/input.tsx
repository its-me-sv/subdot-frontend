import React from "react";

import {InputContainer} from "./styles";

interface MessageInputProps {}

const MessageInput: React.FC<MessageInputProps> = () => {
    return (
        <InputContainer>
            <textarea placeholder="Message" />
            <img alt="send" src={require("../../assets/icons/send.png")} />
        </InputContainer>
    );
};

export default MessageInput;
