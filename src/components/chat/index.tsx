import React, {useEffect, useRef, useState} from "react";

import {Container} from "./styles";

import MessageInput from "./input";
import Messages from "./messages";
import SectionProfile from "../friends-communities/profile";

import {useAppContext} from "../../contexts/app";
import { DBMessage } from "../../utils/types";
import { useUserContext } from "../../contexts/user";
import axios from "axios";
import { REST_API } from "../../utils/constants";
import {toast} from "react-hot-toast";
import { msgsFetch } from "../../translations/chat";
import { useSocketContext } from "../../contexts/socket";

interface ChatProps {
    address: string;
}

const Chat: React.FC<ChatProps> = ({ address }) => {
  const { dark, language} = useAppContext();
  const {account} = useUserContext();
  const {socket} = useSocketContext();
  const [messages, setMessages] = useState<Array<DBMessage>>([]);
  const [page, setPage] = useState<string | null>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const fetched = useRef<boolean>(false);

  const fetchData = () => {
    if (page == null || fetching) return;
    if (!account) return;
    if (address.length === 0) return;
    setFetching(true);
    const reqBody: any = {};
    if (page?.length) reqBody.page = page;
    const msgsPromise = axios.post(
      `${REST_API}/chat/${account.address}/${address}`,
      { ...reqBody }
    );
    toast.promise(msgsPromise, {
      loading: msgsFetch.loading[language],
      success: msgsFetch.success[language],
      error: msgsFetch.error[language]
    });
    msgsPromise
      .then(({data}) => {
        setMessages([...(data.messages as Array<DBMessage>).reverse(), ...messages]);
        setPage(data.page);
      })
      .finally(() => setFetching(false));
  };

  const addMsg = (msg: DBMessage) => {
    setMessages([...messages, msg]);
    socket.emit("joinRoom", msg.message_id);
  };

  useEffect(() => {
    const roomId = [address, account?.address].sort().join("###");
    socket.emit("joinRoom", roomId);
    socket.on("newMessage", addMsg);
    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [addMsg]);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchData();
  }, [address]);

  return (
    <Container dark={dark}>
      <SectionProfile 
        id={address} 
        hover 
      />
      <Messages 
        messages={messages} 
        fetchData={fetchData}
        page={page} 
      />
      <MessageInput 
        address={address} 
        addMsg={addMsg} 
      />
    </Container>
  );
};

export default Chat;
