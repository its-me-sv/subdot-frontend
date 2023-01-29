import React from "react";

interface PeekProps {
    id: string;
}

const Peek: React.FC<PeekProps> = ({id}) => {
    return (
        <div>
            {id}
        </div>
    );
};

export default Peek;
