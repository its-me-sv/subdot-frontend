import React from "react";
import {format} from "timeago.js";

import {FooterItem, PostContainer, PostContent, PostFooter, PostHeader, PostHeaderRight, PostImage, PostTime, PostUsername} from './styles';

interface PostProps {}

const Post: React.FC<PostProps> = () => {
    return (
        <PostContainer>
            <PostHeader>
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
                <FooterItem>
                    <img 
                        alt="comment" 
                        src={require("../../assets/icons/comment.png")} 
                    />
                    <span>1.1m</span>
                </FooterItem>
                <FooterItem>
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
