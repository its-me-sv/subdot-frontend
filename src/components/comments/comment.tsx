import React, {useState, useEffect} from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";
import {encodeAddress} from "@polkadot/util-crypto";

import {
    CommentContainer, CommentHolder, 
    CommentText, CommentTime
} from "./styles";

import {useAppContext} from "../../contexts/app";
import { useSubsocial } from "../../subsocial";
import { PostComment, User } from "../../utils/types";
import { getImage } from "../../utils/utils";
import { DICE_BEAR } from "../../utils/constants";

interface CommentProps {
    comment: PostComment;
}

const Comment: React.FC<CommentProps> = ({comment}) => {
    const navigate = useNavigate();
    const {dark} = useAppContext();
    const {api} = useSubsocial();
    const [owner, setOwner] = useState<User>({
        created: "string",
        username: "string",
        name: "string",
        status: "string",
        picture: `${DICE_BEAR}${comment.creator}`,
    });

    const fetchData = async () => {
        if (!api || !comment) return;
        const profile = await api.base.findProfileSpace(comment.creator);
        if (!profile?.content) return;
        setOwner(profile.content as unknown as User);
    };

    useEffect(() => {
        fetchData();
    }, [api, comment]);

    return (
        <CommentContainer>
            <img 
                onClick={() => navigate(`/profile/${owner.username}`)} 
                alt={`pp of ${comment.creator.slice(7)}`}
                src={getImage(owner.picture)} 
            />
            <CommentHolder dark={dark}>
                <CommentTime>{format(new Date(comment.createdAt))}</CommentTime>
                <CommentText>{comment.body}</CommentText>
            </CommentHolder>
        </CommentContainer>
    );
};

export default Comment;
