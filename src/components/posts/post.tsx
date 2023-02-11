import React, {useEffect, useState} from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";
import tempImg from "../../assets/temp.jpg";
import contentImg from "../../assets/content_temp.jpg";

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
import { UserPost, User } from "../../utils/types";
import { DICE_BEAR } from "../../utils/constants";
import { useSubsocial } from "../../subsocial";

interface PostProps {
    postId: string;
}

const defaultPost: UserPost = {
    description: "",
    picture: "",
    summary: "",
    isShowMore: false
};

const defaultUser: User = {
  created: "2023-02-07T16:25:55.956Z",
  username: "--------",
  name: "-------",
  status: "-------",
  picture: DICE_BEAR,
};

const Post: React.FC<PostProps> = ({postId}) => {
    const navigate = useNavigate();
    const {
        setCommentId, setTransferId,
        language, dark
    } = useAppContext();
    const {api} = useSubsocial();
    const [post, setPost] = useState<UserPost>(defaultPost);
    const [owner, setOwner] = useState<User>(defaultUser);

    const fetchData = async () => {
        if (!api || !postId) return;
    };

    useEffect(() => {
        fetchData();
    }, [api, postId]);

    return (
        <PostContainer dark={dark}>
            <PostHeader onClick={() => navigate("/profile/suraj")}>
                <img 
                    alt="pp"
                    src={tempImg} 
                />
                <PostHeaderRight dark={dark}>
                    <PostUsername>{"<Dark Knight />"}</PostUsername>
                    <PostTime>{posted[language]} {format(new Date(2002, 4, 11))}</PostTime>
                </PostHeaderRight>
            </PostHeader>
            <PostContent dark={dark}>
                Hi there friends. I just took a picture with an stray dog
            </PostContent>
            <PostImage 
                alt="content" 
                src={contentImg} 
                />
            <PostFooter>
                <FooterItem dark={dark}>
                    <img 
                        alt="like" 
                        src={likeIcon} 
                    />
                    <span>1.1m</span>
                </FooterItem>
                <FooterItem dark={dark} onClick={() => setCommentId!("123")}>
                    <img 
                        alt="comment" 
                        src={cmtIcon} 
                    />
                    <span>1.1m</span>
                </FooterItem>
                <FooterItem dark={dark} onClick={() => setTransferId!("<Dark Knight />")}>
                    <img 
                        alt="tip"
                        src={tipIcon} 
                    />
                </FooterItem>
            </PostFooter>
        </PostContainer>
    );
};

export default Post;
