import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, ItemsContainer, Item} from "./styles";

import {useAppContext} from "../../contexts/app";

interface ResultsProps {}

const Results: React.FC<ResultsProps> = () => {
    const naviagte = useNavigate();
    const {explore, setExplore, dark} = useAppContext();

    const handlePress = () => {
        naviagte(`/profile/${explore}`);
        setExplore!("");
    };

    return (
        <Container dark={dark}>
            <ItemsContainer>
                {(new Array(42)).fill(0).map(() => (
                    <Item dark={dark} onClick={handlePress}>{explore}</Item>
                ))}
            </ItemsContainer>
        </Container>
    );
};

export default Results;
