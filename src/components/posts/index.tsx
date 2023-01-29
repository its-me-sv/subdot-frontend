import React from "react";

import {Container, StickyButton} from "./styles";
import {Button} from "../../utils/styles";

interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
    return (
      <Container>
        <StickyButton>
          <Button bgColor="#353132">SHARE A POST</Button>
        </StickyButton>
        Posts
      </Container>
    );
};

export default Posts;
