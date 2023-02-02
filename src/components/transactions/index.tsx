import React from "react";

import {Container, Box, CloseIcon, Title} from "../terms-privacy/styles";
import {TransactionsHolder} from "./styles";
import {title} from "../../translations/transactions";

import Transaction from "./transaction";

import {useAppContext} from "../../contexts/app";

interface TransactionProps {}

const Transactions: React.FC<TransactionProps> = () => {
    const {setTxOpen, language} = useAppContext();

    return (
        <Container>
            <Box>
                <CloseIcon onClick={() => setTxOpen!(false)} >X</CloseIcon>
                <Title>{title[language]}</Title>
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
