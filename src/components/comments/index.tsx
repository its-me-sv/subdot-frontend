import React from "react";

import {Container, Box, CloseIcon, Title} from "../terms-privacy/styles";
import {CommentsHolder} from "./styles";

import Comment from "./comment";
import CommentInput from "./input";

import {useAppContext} from "../../contexts/app";

interface CommentsProps {
    postId: string;
}

const Comments: React.FC<CommentsProps> = () => {
    const {setCommentId} = useAppContext();

    return (
        <Container>
            <Box>
                <CloseIcon onClick={() => setCommentId!("")}>X</CloseIcon>
                <Title>COMMENTS</Title>
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
