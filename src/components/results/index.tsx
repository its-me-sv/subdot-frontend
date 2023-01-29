import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, ItemsContainer, Item} from "./styles";

import {useAppContext} from "../../contexts";

interface ResultsProps {}

const Results: React.FC<ResultsProps> = () => {
    const naviagte = useNavigate();
    const {explore, setExplore} = useAppContext();

    const handlePress = () => {
        naviagte(`/profile/${explore}`);
        setExplore!("");
    };

    return (
        <Container>
            <ItemsContainer>
                {(new Array(42)).fill(0).map(() => (
                    <Item onClick={handlePress}>{explore}</Item>
                ))}
            </ItemsContainer>
        </Container>
    );
};

export default Results;