import React from "react";

import {BoardContainer} from "./styles";

import User from "./user";

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
    return (
        <BoardContainer>
            {new Array(42).fill(7).map(() => <User />)}
        </BoardContainer>
    );
};

export default Board;
