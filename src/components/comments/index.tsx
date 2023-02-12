import React from "react";

import {Container, Box, CloseIcon, Title} from "../terms-privacy/styles";
import {CommentsHolder} from "./styles";
import {title} from "../../translations/comments";

import Comment from "./comment";
import CommentInput from "./input";

import {useAppContext} from "../../contexts/app";

interface CommentsProps {}

const Comments: React.FC<CommentsProps> = () => {
    const {setCmtOpen, language, dark, comments: cmts, setComments} = useAppContext();

    const addComment = (newCmt: string) => {
      window.alert(newCmt);
    };

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => {
            setComments!([]);
            setCmtOpen!(false);
          }} 
            dark={dark}
          >X</CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <CommentsHolder>
            {cmts.length === 0 && <span>No commments yet.</span>}
            {cmts.map((cmt) => (
              <Comment key={cmt.id} comment={cmt} />
            ))}
          </CommentsHolder>
          <CommentInput addComment={addComment} />
        </Box>
      </Container>
    );
};

export default Comments;
