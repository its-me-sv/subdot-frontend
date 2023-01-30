import React from "react";

import {Button} from "../../utils/styles";
import {CommentFooter} from "./styles";

interface CommentInputProps {}

const CommentInput: React.FC<CommentInputProps> = () => {
    return (
        <CommentFooter>
            <textarea rows={2} placeholder="Comment" />
            <Button bgColor="#1a1a1a">Post comment</Button>
        </CommentFooter>
    );
};

export default CommentInput;
