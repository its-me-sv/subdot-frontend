import React from "react";

import {InputContainer} from "./styles";
import {msgPh} from "../../translations/chat";

import {useAppContext} from "../../contexts/app";

interface MessageInputProps {}

const MessageInput: React.FC<MessageInputProps> = () => {
    const {language, dark} = useAppContext();

    return (
        <InputContainer dark={dark}>
            <textarea placeholder={msgPh[language]} />
            <img alt="send" src={require("../../assets/icons/send.png")} />
        </InputContainer>
    );
};

export default MessageInput;
