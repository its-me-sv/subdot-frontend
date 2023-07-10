import React, {useState} from "react";
import sendIcon from "../../assets/icons/send.png";

import {InputContainer} from "./styles";
import {msgPh} from "../../translations/chat";

import {useAppContext} from "../../contexts/app";
import { useChatContext } from "../../contexts/chat";
import { DBMessage } from "../../utils/types";

interface MessageInputProps {
  address: string;
  addMsg: (msg: DBMessage) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({address, addMsg}) => {
    const {language, dark} = useAppContext();
    const {sendMessage} = useChatContext();
    const [msg, setMsg] = useState<string>("");

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
      event
    ) => {
      setMsg!(event.target.value);
    };

    const handleSubmit = () => {
        if (msg.length === 0) return;
        sendMessage!(address, msg, addMsg);
        setMsg("");
    };

    return (
      <InputContainer dark={dark}>
        <textarea
          placeholder={msgPh[language]}
          value={msg}
          onChange={handleChange}
        />
        <img 
          alt="send" 
          src={sendIcon} 
          onClick={handleSubmit} 
        />
      </InputContainer>
    );
};

export default MessageInput;
