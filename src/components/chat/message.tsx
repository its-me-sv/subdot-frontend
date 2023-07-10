import { useAppContext } from "../../contexts/app";
import { DBMessage } from "../../utils/types";
import { MessageContainer } from "./styles";

interface MessageProps {
    message: DBMessage
}

const Message: React.FC<MessageProps> = ({message}) => {
    const {dark} = useAppContext();

    return (
      <MessageContainer key={message.message_id} dark={dark}>
        <span>{message.ipfs_content_id}</span>
        <span>{message.created_at}</span>
      </MessageContainer>
    );
};

export default Message;
