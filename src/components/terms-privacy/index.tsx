import React from "react";

import {loremIpsum} from "../../data/terms-privacy";
import {terms, privacy} from "../../translations/terms-privacy";

import {Container, CloseIcon, Box, Title, Content} from './styles';

import {useAppContext} from "../../contexts/app";

interface TermsPoliciesProps {}

const TermsPolicies: React.FC<TermsPoliciesProps> = () => {
    const {setShowTerms, language, dark} = useAppContext();
    
    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setShowTerms!(false)} dark={dark}>X</CloseIcon>
          <Title dark={dark}>{terms[language]}</Title>
          <Content dark={dark}>{loremIpsum}</Content>
          <Title dark={dark}>{privacy[language]}</Title>
          <Content dark={dark}>{loremIpsum}</Content>
        </Box>
      </Container>
    );
};

export default TermsPolicies;
