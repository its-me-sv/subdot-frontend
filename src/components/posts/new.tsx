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

import {Button} from "../../utils/styles";

import {useAppContext} from "../../contexts/app";

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
    const {setPostMenuOpen} = useAppContext();

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setPostMenuOpen!(false)}>X</CloseIcon>
          <Title>NEW POST</Title>
          <InputsForm>
            <InputLabel>DESCRIPTION</InputLabel>
            <PostDescription rows={4} />
            <InputContainer>
              <InputLabel>PICTURE</InputLabel>
              <Input type="text" placeholder="Address of picture" />
            </InputContainer>
          </InputsForm>
          <Button bgColor="#1a1a1a">POST</Button>
        </Box>
      </Container>
    );
};

export default NewPost;
