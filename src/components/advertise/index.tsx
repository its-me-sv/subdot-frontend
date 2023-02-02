import React from "react";

import {Box, Container, CloseIcon, Title} from "../terms-privacy/styles";
import {
  title, name,
  namePh, duration,
  durationPh, link,
  linkPh, pict,
  pictPh, cost,
  costPh, postAdvert
} from "../../translations/advert";

import {Button} from "../../utils/styles";
import {InputContainer, InputLabel, Input, InputsForm} from "./styles";

import {useAppContext} from "../../contexts/app";

interface AdvertiseProps {}

const Advertise: React.FC<AdvertiseProps> = () => {
    const {setAdvertMenuOpen, language, dark} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setAdvertMenuOpen!(false)} dark={dark}>X</CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <InputsForm>
            <InputContainer>
              <InputLabel>{name[language]}</InputLabel>
              <Input type="text" placeholder={namePh[language]} />
            </InputContainer>
            <InputContainer>
              <InputLabel>{duration[language]}</InputLabel>
              <Input type="number" placeholder={durationPh[language]} />
            </InputContainer>
            <InputContainer>
              <InputLabel>{link[language]}</InputLabel>
              <Input type="text" placeholder={linkPh[language]} />
            </InputContainer>
            <InputContainer>
              <InputLabel>{pict[language]}</InputLabel>
              <Input type="text" placeholder={pictPh[language]} />
            </InputContainer>
            <InputContainer>
              <InputLabel>{cost[language]}</InputLabel>
              <Input type="number" placeholder={costPh[language]} readOnly />
            </InputContainer>
          </InputsForm>
          <Button bgColor="#1a1a1a">{postAdvert[language]}</Button>
        </Box>
      </Container>
    );
};

export default Advertise;
