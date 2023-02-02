import React from "react";

import {Container, StickyButton} from "./styles";
import {Button} from "../../utils/styles";
import {share} from "../../translations/posts";

import Post from "./post";

import {useAppContext} from "../../contexts/app";

interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
    const {setPostMenuOpen, language} = useAppContext();
    
    return (
      <Container>
        <StickyButton>
          <Button 
            bgColor="#353132"
            onClick={() => setPostMenuOpen!(true)}
          >{share[language]}</Button>
        </StickyButton>
        {new Array(7).fill(0).map((_, __) => <Post />)}
      </Container>
    );
};

export default Posts;
