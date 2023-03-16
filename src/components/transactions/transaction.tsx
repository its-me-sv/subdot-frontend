import React from "react";
import {format} from "timeago.js";

import {Amount, Meta, TransactionContainer} from "./styles";
import { TransactionInfo } from "../../utils/types";
import { txDesc } from "../../translations/tx";

import {useAppContext} from "../../contexts/app";

interface TransactionProps {
  tx: TransactionInfo;
}

const Transaction: React.FC<TransactionProps> = ({tx}) => {
    const {dark, language} = useAppContext();

    return (
      <TransactionContainer dark={dark}>
        <Meta dark={dark}>
          <span>{txDesc[language][tx.desc]}</span>
          <span>{format(new Date(tx.createdAt))}</span>
        </Meta>
        <Amount kind={tx.kind}>
          {tx.kind ? "+" : "-"} {tx.amount} SOON
        </Amount>
      </TransactionContainer>
    );
};

export default Transaction;
