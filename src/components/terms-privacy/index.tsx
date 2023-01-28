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
                <Title>Terms & Conditions</Title>
                <Content>{loremIpsum}</Content>
                <Title>Privacy & Policies</Title>
                <Content>{loremIpsum}</Content>
            </Box>
        </Container>
    );
};

export default TermsPolicies;
