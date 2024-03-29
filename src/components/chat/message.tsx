import { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";

import { useAppContext } from "../../contexts/app";
import { DBMessage, MessageContent } from "../../utils/types";
import { MessageContainer } from "./styles";
import skeleton from "../../assets/loader.gif";

import UnverifiedLogo from "../../assets/icons/unverified.png";
import { useSubsocial } from "../../subsocial";
import { useUserContext } from "../../contexts/user";
import { unverified } from "../../translations/chat";
import { useSocketContext } from "../../contexts/socket";

interface MessageProps {
    message: DBMessage
}

const Message: React.FC<MessageProps> = ({message}) => {
    const {dark, language} = useAppContext();
    const {api} = useSubsocial();
    const {account} = useUserContext();
    const {socket} = useSocketContext();
    const [ipfsMessage, setIpfsMessage] = useState<MessageContent|null>(null);
    const [verified, setVerified] = useState<boolean>(message.verified);
    const fetched = useRef<boolean>(false);

    const fetchMessage = async () => {
      if (!api) return;
      let ipfsContent = (await api.ipfs.getContent(
        message.ipfs_content_id
      )) as unknown as MessageContent;
      setIpfsMessage(ipfsContent);
    };

    useEffect(() => {
      if (fetched.current) return;
      fetched.current = true;
      fetchMessage();
    }, [message]);

    useEffect(() => {
      if (verified) return;
      socket.emit("joinRoom", message.message_id);
      socket.on("verifyMessage", (roomId) => {
        if (roomId != message.message_id) return;
        setVerified(true);
      });
      return () => {
        socket.emit("leaveRoom", message.message_id);
      };
    }, [message.message_id]);

    if (ipfsMessage === null) {
      return (
        <MessageContainer key={message.message_id} dark={dark}>
          <img src={skeleton} alt="skeleton loading" />
          <div className="footer">
            <span
              className="timing"
              title={new Date(message.created_at).toString()}
            >
              {format(new Date(message.created_at))}
            </span>
            {!verified && (
              <img src={UnverifiedLogo} title={unverified[language]} />
            )}
          </div>
        </MessageContainer>
      );
    }

    return (
      <MessageContainer 
        key={message.message_id} 
        dark={dark}
        isOwner={`${ipfsMessage.sender === account?.address}`}
      >
        <span className="msg" >{ipfsMessage.message}</span>
        <div className="footer">
          {verified && (
            <span 
              className="timing" 
              title={new Date(message.created_at).toString()}
            >
              {format(new Date(message.created_at))}
            </span>
          )}
          {!verified && <img 
            src={UnverifiedLogo} 
            title={unverified[language]} 
          />}
        </div>
      </MessageContainer>
    );
};

export default Message;
