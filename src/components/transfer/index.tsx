import React from "react";

import {Container, Box, CloseIcon} from "../terms-privacy/styles";
import {InputContainer, InputLabel, Input} from "../advertise/styles";

import {useAppContext} from "../../contexts";
import {Button} from "../../utils/styles";
import {Title, Footer} from "./styles";

interface TransferProps {
    accountId: string;
}

const Transfer: React.FC<TransferProps> = ({accountId}) => {
    const {setTransferId} = useAppContext();

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setTransferId!("")}>X</CloseIcon>
          <Title>Transfer amount to {accountId}</Title>
          <InputContainer>
            <InputLabel>AMOUNT</InputLabel>
            <Input type="number" placeholder="Amount to transfer" />
          </InputContainer>
          <Footer>
            <Button bgColor="#0072bb">TRANSFER</Button>
          </Footer>
        </Box>
      </Container>
    );
};

export default Transfer;
