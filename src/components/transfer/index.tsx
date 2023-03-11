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
import {useSubsocial} from "../../subsocial";
import {getSigner, getTxEventIds} from "../../subsocial/polkadot";
import {useUserContext} from "../../contexts/user";
import {useSocketContext} from "../../contexts/socket";
import { noFunds, transferTrans } from "../../translations/toast";

interface TransferProps {
    accountId: string;
}

const Transfer: React.FC<TransferProps> = ({accountId}) => {
    const {setTransferId, language, dark} = useAppContext();
    const [amt, setAmt] = useState<number>(0);
    const {api} = useSubsocial();
    const {account, setReputation, user} = useUserContext();
    const {socket} = useSocketContext();
    const [recipientId, username] = accountId.split(":");

    const handleTransfer = async () => {
      if (!api || !account) return;
      if (!amt) return toast.error(transferTrans.amtInval[language]);
      if (recipientId === account.address) return toast.error(transferTrans.tipSelf[language]);
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
          getTxEventIds(transferTx);
          axios.put(`${REST_API}/user/incr-rp/${account.address}/1`);
          const {partialFee} = await transferTx.paymentInfo(account.address);
          axios.post(`${REST_API}/transaction/new`, {
            accountId: account.address,
            desc: "Transfer / Tipped to an user",
            kind: false,
            amount:
              +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3) + amt,
          });
          axios.post(`${REST_API}/transaction/new`, {
            accountId: recipientId,
            desc: "Recieved Transfer / Tip from an user",
            kind: true,
            amount: amt,
          });
          socket.emit(
            "newTx",
            recipientId,
            `Recieved ${amt} SOON from ${user?.username}`
          );
          setReputation!(prev => prev + 1);
          toast("Recieved 1 RP for Transfering / Tiping a user", {
            icon: "🔔",
            id: "tipper"
          });
          resolve(true);
        } catch (err) {
          if ((err = "INSUFFICIENT BALANCE")) {
            toast.error(noFunds[language]);
          }
          reject();
        }
      });
      toast.promise(transferPromise, {
        loading: `${transferTrans.transfer.loading[language]} ${amt} SOON`,
        success: transferTrans.transfer.success[language],
        error: transferTrans.transfer.error[language],
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
