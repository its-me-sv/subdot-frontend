import React from "react";

import {Container} from "../terms-privacy/styles";

interface CommentsProps {
    postId: string;
}

const Comments: React.FC<CommentsProps> = () => {
    return (
        <Container>
            Comments
        </Container>
    );
};

export default Comments;
