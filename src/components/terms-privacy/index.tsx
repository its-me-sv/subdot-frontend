import React from "react";

import {loremIpsum} from "../../data/terms-privacy";
import {terms, privacy} from "../../translations/terms-privacy";

import {Container, CloseIcon, Box, Title, Content} from './styles';

import {useAppContext} from "../../contexts/app";

interface TermsPoliciesProps {}

const TermsPolicies: React.FC<TermsPoliciesProps> = () => {
    const {setShowTerms, language} = useAppContext();
    
    return (
        <Container>
            <Box>
                <CloseIcon onClick={() => setShowTerms!(false)}>X</CloseIcon>
                <Title>{terms[language]}</Title>
                <Content>{loremIpsum}</Content>
                <Title>{privacy[language]}</Title>
                <Content>{loremIpsum}</Content>
            </Box>
        </Container>
    );
};

export default TermsPolicies;
