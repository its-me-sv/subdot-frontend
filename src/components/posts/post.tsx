import React from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";

import {
    FooterItem, PostContainer, 
    PostContent, PostFooter, 
    PostHeader, PostHeaderRight, 
    PostImage, PostTime, 
    PostUsername
} from './styles';
import {posted} from "../../translations/posts";

import {useAppContext} from "../../contexts/app";

interface PostProps {}

const Post: React.FC<PostProps> = () => {
    const navigate = useNavigate();
    const {
        setCommentId, setTransferId,
        language, dark
    } = useAppContext();

    return (
        <PostContainer dark={dark}>
            <PostHeader onClick={() => navigate("/profile/suraj")}>
                <img 
                    alt="pp"
                    src={require("../../assets/temp.jpg")} 
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
                src={require("../../assets/content_temp.jpg")} 
                />
            <PostFooter>
                <FooterItem dark={dark}>
                    <img 
                        alt="like" 
                        src={require("../../assets/icons/like.png")} 
                    />
                    <span>1.1m</span>
                </FooterItem>
                <FooterItem dark={dark} onClick={() => setCommentId!("123")}>
                    <img 
                        alt="comment" 
                        src={require("../../assets/icons/comment.png")} 
                    />
                    <span>1.1m</span>
                </FooterItem>
                <FooterItem dark={dark} onClick={() => setTransferId!("<Dark Knight />")}>
                    <img 
                        alt="tip"
                        src={require("../../assets/icons/tip.png")} 
                    />
                </FooterItem>
            </PostFooter>
        </PostContainer>
    );
};

export default Post;
