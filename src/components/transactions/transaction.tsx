import React from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";
import tmpImg from "../../assets/temp.jpg";

import {Amount, Meta, TransactionContainer} from "./styles";

import {useAppContext} from "../../contexts/app";

interface TransactionProps {}

const Transaction: React.FC<TransactionProps> = () => {
    const navigate = useNavigate();
    const {dark} = useAppContext();

    return (
      <TransactionContainer 
        onClick={() => navigate("/profile/suraj")}
        dark={dark}
      >
        <img alt="" src={tmpImg} />
        <Meta dark={dark}>
          <span>{"<Dark Knight />"}</span>
          <span>{format(new Date(2023, 0, 28))}</span>
        </Meta>
        <Amount dark={dark}>+ 21$</Amount>
      </TransactionContainer>
    );
};

export default Transaction;
