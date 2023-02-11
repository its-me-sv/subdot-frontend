import React, {useEffect, useState} from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";

import {
    FooterItem, PostContainer, 
    PostContent, PostFooter, 
    PostHeader, PostHeaderRight, 
    PostImage, PostTime, 
    PostUsername
} from './styles';
import likeIcon from "../../assets/icons/like.png";
import cmtIcon from "../../assets/icons/comment.png";
import tipIcon from "../../assets/icons/tip.png";
import {posted} from "../../translations/posts";

import {useAppContext} from "../../contexts/app";
import { UserPost, User, UserPostMeta } from "../../utils/types";
import { useSubsocial } from "../../subsocial";
import { getImage } from "../../utils/utils";

import {defaultUser, defaultPost, defaultUserPostMeta} from "./data";

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
    const [post, setPost] = useState<UserPost>(defaultPost);
    const [owner, setOwner] = useState<User>(defaultUser);
    const [postMeta, setPostMeta] = useState<UserPostMeta>(defaultUserPostMeta);

    const fetchData = async () => {
        if (!api || !postId) return;
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
    };

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
            <img alt="like" src={likeIcon} />
            {postMeta.likes > 0 && <span>1.1m</span>}
          </FooterItem>
          <FooterItem dark={dark} onClick={() => setCommentId!("123")}>
            <img alt="comment" src={cmtIcon} />
            <span>1.1m</span>
          </FooterItem>
          <FooterItem dark={dark} onClick={() => setTransferId!(owner.username)}>
            <img alt="tip" src={tipIcon} />
          </FooterItem>
        </PostFooter>
      </PostContainer>
    );
};

export default Post;
