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

import {useAppContext} from "../../contexts/app";

interface PostProps {}

const Post: React.FC<PostProps> = () => {
    const navigate = useNavigate();
    const {setCommentId, setTransferId} = useAppContext();

    return (
        <PostContainer>
            <PostHeader onClick={() => navigate("/profile/suraj")}>
                <img 
                    alt="pp"
                    src={require("../../assets/temp.jpg")} 
                />
                <PostHeaderRight>
                    <PostUsername>{"<Dark Knight />"}</PostUsername>
                    <PostTime>posted {format(new Date(2002, 4, 11))}</PostTime>
                </PostHeaderRight>
            </PostHeader>
            <PostContent>
                Hi there friends. I just took a picture with an stray dog
            </PostContent>
            <PostImage 
                alt="content" 
                src={require("../../assets/content_temp.jpg")} 
                />
            <PostFooter>
                <FooterItem>
                    <img 
                        alt="like" 
                        src={require("../../assets/icons/like.png")} 
                    />
                    <span>1.1m</span>
                </FooterItem>
                <FooterItem onClick={() => setCommentId!("123")}>
                    <img 
                        alt="comment" 
                        src={require("../../assets/icons/comment.png")} 
                    />
                    <span>1.1m</span>
                </FooterItem>
                <FooterItem onClick={() => setTransferId!("<Dark Knight />")}>
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
