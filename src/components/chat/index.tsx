import React from "react";

import {Container} from "./styles";

import MessageInput from "./input";
import Messages from "./messages";
import SectionProfile from "../friends-communities/profile";

import {useAppContext} from "../../contexts/app";

interface ChatProps {
    address: string
}

const Chat: React.FC<ChatProps> = ({ address }) => {
  const { dark } = useAppContext();

  return (
    <Container dark={dark}>
      <SectionProfile id={address} hover />
      <Messages />
      <MessageInput />
    </Container>
  );
};

export default Chat;
