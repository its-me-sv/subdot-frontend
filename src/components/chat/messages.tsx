import React from "react";

import {MessagesContainer} from "./styles";

import { DBMessage } from "../../utils/types";
import Message from "./message";
import { FetchButton } from "../reputation/styles";
import { Button } from "../../utils/styles";
import { useAppContext } from "../../contexts/app";
import { loadMore } from "../../translations/transactions";
import { noMsgs } from "../../translations/chat";

interface MessagesProps {
  messages: Array<DBMessage>;
  fetchData: () => void;
  page: string | null;
}

const Messages: React.FC<MessagesProps> = ({ messages, fetchData, page }) => {
  const { dark, language } = useAppContext();

  return (
    <MessagesContainer id="messagesBox">
      {messages.length === 0 && <span>{noMsgs[language]}</span>}
      {page !== null && (
        <FetchButton>
          <Button
            bgColor={dark ? "#ffffff" : "#222222"}
            dark={dark}
            onClick={fetchData}
          >
            {loadMore[language]}
          </Button>
        </FetchButton>
      )}
      {messages.map((message) => (
        <Message key={message.message_id} message={message} />
      ))}
    </MessagesContainer>
  );
};

export default Messages;
