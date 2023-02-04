import React from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";
import tempImg from "../../assets/temp.jpg";

import {
    CommentContainer, CommentHolder, 
    CommentText, CommentTime
} from "./styles";

import {useAppContext} from "../../contexts/app";

interface CommentProps {}

const Comment: React.FC<CommentProps> = () => {
    const navigate = useNavigate();
    const {dark} = useAppContext();

    return (
        <CommentContainer>
            <img onClick={() => navigate("/profile/dk")} alt="pp" src={tempImg} />
            <CommentHolder dark={dark}>
                <CommentTime>{format(new Date(2023, 0, 7))}</CommentTime>
                <CommentText>Very nice picture</CommentText>
            </CommentHolder>
        </CommentContainer>
    );
};

export default Comment;
