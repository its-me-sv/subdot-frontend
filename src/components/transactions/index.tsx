import React from "react";

import {Container, Box, CloseIcon, Title} from "../terms-privacy/styles";
import {TransactionsHolder} from "./styles";
import {title} from "../../translations/transactions";

import Transaction from "./transaction";

import {useAppContext} from "../../contexts/app";

interface TransactionProps {}

const Transactions: React.FC<TransactionProps> = () => {
    const {setTxOpen, language, dark} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setTxOpen!(false)} dark={dark}>X</CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <TransactionsHolder>
            {new Array(42).fill(7).map(() => (
              <Transaction />
            ))}
          </TransactionsHolder>
        </Box>
      </Container>
    );
};

export default Transactions;
