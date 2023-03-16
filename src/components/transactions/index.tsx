import React, {useState, useEffect, useRef} from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {Container, Box, CloseIcon, Title} from "../terms-privacy/styles";
import {TransactionsHolder} from "./styles";
import {title, noTx, loadMore} from "../../translations/transactions";
import {txsFetch} from "../../translations/toast";

import Transaction from "./transaction";

import {useAppContext} from "../../contexts/app";
import { useUserContext } from "../../contexts/user";
import { TransactionInfo } from "../../utils/types";
import { REST_API } from "../../utils/constants";
import { FetchButton } from "../reputation/styles";
import { Button } from "../../utils/styles";

interface TransactionProps {}

const Transactions: React.FC<TransactionProps> = () => {
    const {setTxOpen, language, dark} = useAppContext();
    const {account} = useUserContext();
    const [txs, setTxs] = useState<Array<TransactionInfo>>([]);
    const [page, setPage] = useState<string | null>("");
    const fetched = useRef<boolean>(false);

    const fetchData = () => {
      if (page == null) return;
      if (!account) return;
      const reqBody: any = {};
      if (page?.length) reqBody.page = page;
      const txsPromise = axios.post(
        `${REST_API}/transaction/${account.address}`,
        { ...reqBody }
      );
      toast.promise(txsPromise, {
        loading: txsFetch.loading[language],
        success: txsFetch.success[language],
        error: txsFetch.error[language]
      });
      txsPromise.then(({data}) => {
        setTxs([...txs, ...data.txs]);
        setPage(data.page);
      });
    };

    useEffect(() => {
      if (fetched.current) return;
      fetched.current = true;
      fetchData();
    }, [account]);

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setTxOpen!(false)} dark={dark}>
            X
          </CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <TransactionsHolder dark={dark}>
            {txs.length === 0 && <span>{noTx[language]}</span>}
            {txs.map((tx) => (
              <Transaction key={tx._id} tx={tx} />
            ))}
            {page !== null && (
              <FetchButton>
                <Button
                  bgColor={dark ? "#ffffff" : "#222222"}
                  dark={dark}
                  onClick={fetchData}
                >
                  {loadMore[language]}
                </Button>
              </FetchButton>
            )}
          </TransactionsHolder>
        </Box>
      </Container>
    );
};

export default Transactions;
