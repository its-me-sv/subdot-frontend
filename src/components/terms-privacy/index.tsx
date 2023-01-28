import React from "react";

import {loremIpsum} from "./data";

import {Container, CloseIcon, Box, Title, Content} from './styles';

import {useAppContext} from "../../contexts";

interface TermsPoliciesProps {}

const TermsPolicies: React.FC<TermsPoliciesProps> = () => {
    const {setShowTerms} = useAppContext();
    
    return (
        <Container>
            <Box>
                <CloseIcon onClick={() => setShowTerms!(false)}>X</CloseIcon>
                <Title>TERMS & CONDITIONS</Title>
                <Content>{loremIpsum}</Content>
                <Title>PRIVACY & POLICIES</Title>
                <Content>{loremIpsum}</Content>
            </Box>
        </Container>
    );
};

export default TermsPolicies;
