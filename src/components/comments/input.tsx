import React, {useState} from "react";

import {Button} from "../../utils/styles";
import {CommentFooter} from "./styles";
import {cmtPh, pstCmt} from "../../translations/comments";

import {useAppContext} from "../../contexts/app";

interface CommentInputProps {
  addComment: (newCmt: string, cb: () => void) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  addComment
}) => {
    const {language, dark} = useAppContext();
    const [newCmt, setNewCmt] = useState<string>("");

    const handleSubmit = () => {
      addComment(newCmt, () => setNewCmt(""))
    };

    const handleKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (
      event
    ) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
        return;
      }
    };

    return (
      <CommentFooter dark={dark}>
        <textarea
          rows={2}
          placeholder={cmtPh[language]}
          value={newCmt}
          onChange={(e) => setNewCmt(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button
          bgColor={dark ? "#ffffff" : "#222222"}
          dark={dark}
          onClick={handleSubmit}
        >
          {pstCmt[language]}
        </Button>
      </CommentFooter>
    );
};

export default CommentInput;
