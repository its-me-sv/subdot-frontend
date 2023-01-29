import React from "react";

import {Container, StickyButton} from "./styles";
import {Button} from "../../utils/styles";

import Post from "./post";

interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
    return (
      <Container>
        <StickyButton>
          <Button bgColor="#353132">SHARE A POST</Button>
        </StickyButton>
        {new Array(7).fill(0).map((_, __) => <Post />)}
      </Container>
    );
};

export default Posts;
