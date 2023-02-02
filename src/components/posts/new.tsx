import React from "react";

import {
    Container, Box, 
    CloseIcon, Title
} from "../terms-privacy/styles";
import {
    InputsForm, InputContainer,
    InputLabel, Input
} from "../advertise/styles";
import {PostDescription} from "./styles";
import {
  newPost, desc,
  descPh, pict,
  pictPh, post
} from "../../translations/posts";

import {Button} from "../../utils/styles";

import {useAppContext} from "../../contexts/app";

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
    const {setPostMenuOpen, language} = useAppContext();

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setPostMenuOpen!(false)}>X</CloseIcon>
          <Title>{newPost[language]}</Title>
          <InputsForm>
            <InputLabel>{desc[language]}</InputLabel>
            <PostDescription rows={4} placeholder={descPh[language]} />
            <InputContainer>
              <InputLabel>{pict[language]}</InputLabel>
              <Input type="text" placeholder={pictPh[language]} />
            </InputContainer>
          </InputsForm>
          <Button bgColor="#1a1a1a">{post[language]}</Button>
        </Box>
      </Container>
    );
};

export default NewPost;
