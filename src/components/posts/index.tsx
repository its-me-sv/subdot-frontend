import React from "react";

import {Container, StickyButton} from "./styles";
import {Button} from "../../utils/styles";

import Post from "./post";

import {useAppContext} from "../../contexts/app";

interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
    const {setPostMenuOpen} = useAppContext();
    
    return (
      <Container>
        <StickyButton>
          <Button 
            bgColor="#353132"
            onClick={() => setPostMenuOpen!(true)}
          >SHARE A POST</Button>
        </StickyButton>
        {new Array(7).fill(0).map((_, __) => <Post />)}
      </Container>
    );
};

export default Posts;
