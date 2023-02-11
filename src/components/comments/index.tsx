import React from "react";

import {Container, Box, CloseIcon, Title} from "../terms-privacy/styles";
import {CommentsHolder} from "./styles";
import {title} from "../../translations/comments";

import Comment from "./comment";
import CommentInput from "./input";

import {useAppContext} from "../../contexts/app";
import { PostComment } from "../../utils/types";

interface CommentsProps {
  cmts: Array<PostComment>;
}

const Comments: React.FC<CommentsProps> = ({cmts}) => {
    const {setComments, language, dark} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setComments!([])} dark={dark}>
            X
          </CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <CommentsHolder>
            {cmts.length === 0 && <span>No commments yet.</span>}
            {cmts.map((cmt) => (
              <Comment key={cmt.id} comment={cmt} />
            ))}
          </CommentsHolder>
          <CommentInput />
        </Box>
      </Container>
    );
};

export default Comments;
