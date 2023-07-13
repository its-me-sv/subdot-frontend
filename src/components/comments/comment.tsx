import React, {useState, useEffect} from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";

import {
    CommentContainer, CommentHolder, 
    CommentMeta, 
    CommentText, CommentTime
} from "./styles";

import {useAppContext} from "../../contexts/app";
import { useSubsocial } from "../../subsocial";
import { PostComment, User } from "../../utils/types";
import { getImage } from "../../utils/utils";
import { DICE_BEAR } from "../../utils/constants";
import { defaultUser } from "../peek/data";
import skeleton from "../../assets/loader.gif";

interface CommentProps {
    comment: PostComment;
}

const Comment: React.FC<CommentProps> = ({comment}) => {
    const navigate = useNavigate();
    const {dark, loggedIn} = useAppContext();
    const {api} = useSubsocial();
    const [owner, setOwner] = useState<User>(defaultUser);

    const fetchData = async () => {
        if (!api || !comment) return;
        const profile = await api.base.findProfileSpace(comment.creator);
        if (!profile?.content) return;
        setOwner(profile.content as unknown as User);
    };

    const onProfileClick = () => {
      if (!loggedIn) {
        window.alert("Create an account today");
        return;
      }
      navigate(`/profile/${owner.username}`);
    };

    useEffect(() => {
        fetchData();
    }, [api, comment]);

    return (
      <CommentContainer>
        <img
          onClick={onProfileClick}
          alt={`pp of ${comment.creator.slice(7)}`}
          src={getImage(owner.picture)}
        />
        <CommentHolder dark={dark}>
          <CommentMeta>
            {owner.username === "--------" ? (
              <img src={skeleton} alt="skeleton loading" />
            ) : (
              <span>{owner.username}</span>
            )}
            <CommentTime title={new Date(comment.createdAt).toString()}>
              {format(new Date(comment.createdAt))}
            </CommentTime>
          </CommentMeta>
          <CommentText>{comment.body}</CommentText>
        </CommentHolder>
      </CommentContainer>
    );
};

export default Comment;
