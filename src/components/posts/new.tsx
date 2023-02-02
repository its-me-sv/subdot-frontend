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
    const {setPostMenuOpen, language, dark} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setPostMenuOpen!(false)} dark={dark}>X</CloseIcon>
          <Title dark={dark}>{newPost[language]}</Title>
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
