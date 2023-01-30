import React from "react";

import {Box, Container, CloseIcon, Title} from "../terms-privacy/styles";
import {Button} from "../../utils/styles";
import {InputContainer, InputLabel, Input, InputsForm} from "./styles";

import {useAppContext} from "../../contexts/app";

interface AdvertiseProps {}

const Advertise: React.FC<AdvertiseProps> = () => {
    const {setAdvertMenuOpen} = useAppContext();

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setAdvertMenuOpen!(false)}>X</CloseIcon>
          <Title>ADVERTISE</Title>
          <InputsForm>
            <InputContainer>
              <InputLabel>TITLE</InputLabel>
              <Input type="text" placeholder="Add title goes here" />
            </InputContainer>
            <InputContainer>
              <InputLabel>DURATION</InputLabel>
              <Input type="number" placeholder="Duration in hours" />
            </InputContainer>
            <InputContainer>
              <InputLabel>LINK</InputLabel>
              <Input type="text" placeholder="Link to navigate" />
            </InputContainer>
            <InputContainer>
              <InputLabel>PICTURE</InputLabel>
              <Input type="text" placeholder="Address of picture" />
            </InputContainer>
            <InputContainer>
              <InputLabel>COST</InputLabel>
              <Input type="number" placeholder="Estimated cost" readOnly />
            </InputContainer>
          </InputsForm>
          <Button bgColor="#1a1a1a">POST ADVERTISEMENT</Button>
        </Box>
      </Container>
    );
};

export default Advertise;
