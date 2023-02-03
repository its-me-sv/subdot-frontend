import React from "react";

import {Button} from "../../utils/styles";
import {CommentFooter} from "./styles";
import {cmtPh, pstCmt} from "../../translations/comments";

import {useAppContext} from "../../contexts/app";

interface CommentInputProps {}

const CommentInput: React.FC<CommentInputProps> = () => {
    const {language, dark} = useAppContext();

    return (
      <CommentFooter dark={dark}>
        <textarea rows={2} placeholder={cmtPh[language]} />
        <Button bgColor={dark ? "#f5f4f9" : "#1a1a1a"} dark={dark}>
          {pstCmt[language]}
        </Button>
      </CommentFooter>
    );
};

export default CommentInput;
