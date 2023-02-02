import React from "react";

import {Button} from "../../utils/styles";
import {CommentFooter} from "./styles";
import {cmtPh, pstCmt} from "../../translations/comments";

import {useAppContext} from "../../contexts/app";

interface CommentInputProps {}

const CommentInput: React.FC<CommentInputProps> = () => {
    const {language} = useAppContext();

    return (
      <CommentFooter>
        <textarea rows={2} placeholder={cmtPh[language]} />
        <Button bgColor="#1a1a1a">{pstCmt[language]}</Button>
      </CommentFooter>
    );
};

export default CommentInput;
