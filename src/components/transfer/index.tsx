import React from "react";

import {Container, Box, CloseIcon} from "../terms-privacy/styles";
import {InputContainer, InputLabel, Input} from "../advertise/styles";
import {
  recPrfx, amount,
  amtPh, transfer
} from "../../translations/transactions";

import {useAppContext} from "../../contexts/app";
import {Button} from "../../utils/styles";
import {Title, Footer} from "./styles";

interface TransferProps {
    accountId: string;
}

const Transfer: React.FC<TransferProps> = ({accountId}) => {
    const {setTransferId, language, dark} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setTransferId!("")} dark={dark}>
            X
          </CloseIcon>
          <Title>
            {recPrfx[language]} {accountId}
          </Title>
          <InputContainer>
            <InputLabel dark={dark}>{amount[language]}</InputLabel>
            <Input dark={dark} type="number" placeholder={amtPh[language]} />
          </InputContainer>
          <Footer>
            <Button bgColor="#0072bb">{transfer[language]}</Button>
          </Footer>
        </Box>
      </Container>
    );
};

export default Transfer;
