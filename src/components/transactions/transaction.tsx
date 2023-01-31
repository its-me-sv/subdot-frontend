import React from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";

import {Amount, Meta, TransactionContainer} from "./styles";

interface TransactionProps {}

const Transaction: React.FC<TransactionProps> = () => {
    const navigate = useNavigate();

    return (
      <TransactionContainer onClick={() => navigate("/profile/suraj")}>
        <img alt="" src={require("../../assets/temp.jpg")} />
        <Meta>
          <span>{"<Dark Knight />"}</span>
          <span>{format(new Date(2023, 0, 28))}</span>
        </Meta>
        <Amount>+ 21$</Amount>
      </TransactionContainer>
    );
};

export default Transaction;
