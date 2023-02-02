import React from "react";

import {Container, Box, CloseIcon, Title} from "../terms-privacy/styles";
import {CommentsHolder} from "./styles";
import {title} from "../../translations/comments";

import Comment from "./comment";
import CommentInput from "./input";

import {useAppContext} from "../../contexts/app";

interface CommentsProps {
    postId: string;
}

const Comments: React.FC<CommentsProps> = () => {
    const {setCommentId, language, dark} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setCommentId!("")} dark={dark}>X</CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <CommentsHolder>
            {new Array(42).fill(0).map((_) => (
              <Comment />
            ))}
          </CommentsHolder>
          <CommentInput />
        </Box>
      </Container>
    );
};

export default Comments;
