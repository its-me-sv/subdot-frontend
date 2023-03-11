import React from "react";
import {format} from "timeago.js";

import {Amount, Meta, TransactionContainer} from "./styles";
import { TransactionInfo } from "../../utils/types";

import {useAppContext} from "../../contexts/app";

interface TransactionProps {
  tx: TransactionInfo;
}

const Transaction: React.FC<TransactionProps> = ({tx}) => {
    const {dark} = useAppContext();

    return (
      <TransactionContainer dark={dark}>
        <Meta dark={dark}>
          <span>{tx.desc}</span>
          <span>{format(new Date(tx.createdAt))}</span>
        </Meta>
        <Amount kind={tx.kind}>
          {tx.kind ? "+" : "-"} {tx.amount} SOON
        </Amount>
      </TransactionContainer>
    );
};

export default Transaction;
