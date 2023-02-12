import React, {useState} from "react";

import {Button} from "../../utils/styles";
import {CommentFooter} from "./styles";
import {cmtPh, pstCmt} from "../../translations/comments";

import {useAppContext} from "../../contexts/app";

interface CommentInputProps {
  addComment: (newCmt: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  addComment
}) => {
    const {language, dark} = useAppContext();
    const [newCmt, setNewCmt] = useState<string>("");

    return (
      <CommentFooter dark={dark}>
        <textarea 
          rows={2} 
          placeholder={cmtPh[language]}
          value={newCmt} 
          onChange={(e) => setNewCmt(e.target.value)}
        />
        <Button 
          bgColor={dark ? "#f5f4f9" : "#1a1a1a"} dark={dark}
          onClick={() => addComment(newCmt)}
        >
          {pstCmt[language]}
        </Button>
      </CommentFooter>
    );
};

export default CommentInput;
