import React from "react";

import {Container, SearchIcon, Input} from "./styles";

interface ExploreProps {}

const Explore: React.FC<ExploreProps> = () => {
    return (
        <Container>
            <SearchIcon />
            <Input 
                type="text" 
                placeholder="Explore"
            />
        </Container>
    );
};

export default Explore;
