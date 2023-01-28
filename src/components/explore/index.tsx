import React from "react";

import {Container, SearchIcon, Input} from "./styles";

import {useAppContext} from "../../contexts";

interface ExploreProps {}

const Explore: React.FC<ExploreProps> = () => {
    const {setExplore, explore} = useAppContext();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setExplore!(event.target.value);
    };

    return (
        <Container>
            <SearchIcon />
            <Input 
                type="text" 
                placeholder="Explore"
                value={explore}
                onChange={handleChange}
            />
        </Container>
    );
};

export default Explore;
