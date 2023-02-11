import React, {useEffect, useState} from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";
import { idToBn } from "@subsocial/utils";

import {
    FooterItem, PostContainer, 
    PostContent, PostFooter, 
    PostHeader, PostHeaderRight, 
    PostImage, PostTime, 
    PostUsername
} from './styles';
import likeIcon from "../../assets/icons/like.png";
import likedIcon from "../../assets/icons/liked.png";
import cmtIcon from "../../assets/icons/comment.png";
import tipIcon from "../../assets/icons/tip.png";
import {posted} from "../../translations/posts";

import {useAppContext} from "../../contexts/app";
import { UserPost, User, UserPostMeta } from "../../utils/types";
import { useSubsocial } from "../../subsocial";
import { getImage } from "../../utils/utils";

import {defaultUser, defaultPost, defaultUserPostMeta} from "./data";
import { useUserContext } from "../../contexts/user";

interface PostProps {
  postId: string;
}

const Post: React.FC<PostProps> = ({postId}) => {
    const navigate = useNavigate();
    const {
        setCommentId, setTransferId,
        language, dark
    } = useAppContext();
    const {api} = useSubsocial();
    const {account} = useUserContext();
    const [post, setPost] = useState<UserPost>(defaultPost);
    const [owner, setOwner] = useState<User>(defaultUser);
    const [postMeta, setPostMeta] = useState<UserPostMeta>(defaultUserPostMeta);
    const [commentsId, setCommentsId] = useState<Array<string>>([]);
    const [likedId, setLikeId] = useState<string>("0");

    const fetchData = async () => {
        if (!api || !postId || !account) return;
        const post = await api.findPost({id: postId});
        if (!post?.content) return;
        setPost(post.content as unknown as UserPost);
        setPostMeta({
            likes: post.struct.upvotesCount,
            createdAt: post.struct.createdAtTime
        });
        api.base.findProfileSpace(post.struct.createdByAccount)
        .then(profile => {
            if (!profile?.content) return;
            setOwner(profile.content as unknown as User);
        });
        api.blockchain.getReplyIdsByPostId(idToBn(postId))
        .then((cmtData) => {
          setCommentsId(cmtData.map((v) => v.toString()));
        });
        api.blockchain.getReactionIdsByAccount(account.address, [postId])
        .then((reactData) => {
          setLikeId(reactData[0].toString());
        });
    };

    const toggleLike = () => {};

    useEffect(() => {
        fetchData();
    }, [api, postId]);

    return (
      <PostContainer dark={dark}>
        <PostHeader onClick={() => navigate(`/profile/${owner.username}`)}>
          <img alt={`pp of ${owner.username}`} src={getImage(owner.picture)} />
          <PostHeaderRight dark={dark}>
            <PostUsername>{owner.username}</PostUsername>
            <PostTime>
              {posted[language]} {format(new Date(postMeta.createdAt))}
            </PostTime>
          </PostHeaderRight>
        </PostHeader>
        <PostContent dark={dark}>{post.description}</PostContent>
        {post.picture.length > 0 && (
          <PostImage alt="content" src={getImage(post.picture)} />
        )}
        <PostFooter>
          <FooterItem dark={dark}>
            <img 
              alt="like" 
              src={(likedId === "0") ? likeIcon : likedIcon}
              onClick={toggleLike} 
            />
            {postMeta.likes > 0 && <span>{postMeta.likes}</span>}
          </FooterItem>
          <FooterItem dark={dark} onClick={() => setCommentId!("123")}>
            <img alt="comment" src={cmtIcon} />
            {commentsId.length > 0 && <span>{commentsId.length}</span>}
          </FooterItem>
          <FooterItem dark={dark} onClick={() => setTransferId!(owner.username)}>
            <img alt="tip" src={tipIcon} />
          </FooterItem>
        </PostFooter>
      </PostContainer>
    );
};

export default Post;
