import React, {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {encodeAddress} from "@polkadot/util-crypto";

import {Container, Box, CloseIcon} from "../terms-privacy/styles";
import {InputContainer, InputLabel, Input} from "../advertise/styles";
import {
  recPrfx, amount,
  amtPh, transfer
} from "../../translations/transactions";
import { BALANCE_DIVISOR, REST_API } from "../../utils/constants";

import {useAppContext} from "../../contexts/app";
import {Button} from "../../utils/styles";
import {Title, Footer} from "./styles";
import { useSubsocial } from "../../subsocial";
import { getSigner, getTxEventIds } from "../../subsocial/polkadot";
import { useUserContext } from "../../contexts/user";

interface TransferProps {
    accountId: string;
}

const Transfer: React.FC<TransferProps> = ({accountId}) => {
    const {setTransferId, language, dark} = useAppContext();
    const [amt, setAmt] = useState<number>(0);
    const {api} = useSubsocial();
    const {account, setReputation} = useUserContext();
    const [recipientId, username] = accountId.split(":");

    const handleTransfer = async () => {
      if (!api || !account) return;
      if (!amt) return toast.error("Invalid amount");
      if (recipientId === account.address) return toast.error("Cannot tip yourself");
      const substr = await api.substrateApi;
      const transferTx = substr.tx.balances.transfer(
        encodeAddress(recipientId, 28), 
        amt * BALANCE_DIVISOR
      );
      const transferPromise = new Promise(async (resolve, reject) => {
        try {
          const signer = await getSigner(account.address);
          if (!signer) return reject();
          await transferTx.signAsync(account.address, {signer});
          await getTxEventIds(transferTx);
          axios.put(`${REST_API}/user/incr-rp/${account.address}/1`);
          const {partialFee} = await transferTx.paymentInfo(account.address);
          axios.post(`${REST_API}/transaction/new`, {
            accountId: account.address,
            desc: "Transfer / Tipped to an user",
            kind: false,
            amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
          });
          axios.post(`${REST_API}/transaction/new`, {
            accountId: recipientId,
            desc: "Recieved Transfer / Tip from an user",
            kind: true,
            amount: +(amt * BALANCE_DIVISOR).toPrecision(3),
          });
          setReputation!(prev => prev + 1);
          resolve(true);
        } catch (err) {
          if ((err = "INSUFFICIENT BALANCE")) {
            toast.error(
              "Your account has insufficient funds to complete this transaction"
            );
          }
          reject();
        }
      });
      toast.promise(transferPromise, {
        loading: `Transferring ${amt} SOON`,
        success: "Transfer success",
        error: "Unable to transfer"
      });
      transferPromise
      .finally(() => {
        setTransferId!("");
      });
    };

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setTransferId!("")} dark={dark}>
            X
          </CloseIcon>
          <Title dark={dark}>
            {recPrfx[language]} {username}
          </Title>
          <InputContainer>
            <InputLabel dark={dark}>{amount[language]}</InputLabel>
            <Input 
              dark={dark} 
              type="number" 
              value={amt}
              onChange={e => setAmt(+e.target.value)}
              placeholder={amtPh[language]} 
            />
          </InputContainer>
          <Footer>
            <Button 
              bgColor="#0072bb"
              onClick={handleTransfer}
            >{transfer[language]}</Button>
          </Footer>
        </Box>
      </Container>
    );
};

export default Transfer;
