import React from "react";
import sendIcon from "../../assets/icons/send.png";

import {InputContainer} from "./styles";
import {msgPh} from "../../translations/chat";

import {useAppContext} from "../../contexts/app";

interface MessageInputProps {}

const MessageInput: React.FC<MessageInputProps> = () => {
    const {language, dark} = useAppContext();

    return (
        <InputContainer dark={dark}>
            <textarea placeholder={msgPh[language]} />
            <img alt="send" src={sendIcon} />
        </InputContainer>
    );
};

export default MessageInput;
