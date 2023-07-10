import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useUserContext } from "./user";
import { DBMessage, MessageContent } from "../utils/types";
import { useAppContext } from "./app";
import { useSubsocial } from "../subsocial";
import { encodeAddress } from "@polkadot/util-crypto";

import { ADVERT_BENEFICIAR, BALANCE_DIVISOR, MSG_COST, REST_API } from "../utils/constants";
import { noFunds } from "../translations/toast";
import { getSigner, getTxEventIds } from "../subsocial/polkadot";
import { msgPromise } from "../translations/chat";

interface ChatContextInterface {
  currChat: string;
  setCurrChat?: (val: string) => void;
  resetChat?: () => void;
  sendMessage?: (
    reciever: string,
    message: string,
    addMsg: (msg: DBMessage) => void
  ) => void;
}

const defaultState: ChatContextInterface = {
    currChat: ""
};

export const ChatContext = createContext<ChatContextInterface>(defaultState);

export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {account} = useUserContext();
    const {language} = useAppContext();
    const {api} = useSubsocial();
    const [currChat, setCurrChat] = useState<string>("");

    const resetChat = () => {
        setCurrChat("");
    };

    const sendMessage = (
      reciever: string,
      message: string,
      addMsg: (msg: DBMessage) => void
    ) => {
      if (!account || !account.address || !api) return;
      const messagePromise = new Promise(async (resolve, reject) => {
        try {
          const ipfsMsg: MessageContent = {
            reciever,
            sender: account.address,
            message,
          };
          const substr = await api.substrateApi;
          const ipfsMsgID = await api.ipfs.saveContent({
            ...ipfsMsg,
          });
          const {data: msgFromDB} = await axios
            .post(
              `${REST_API}/chat/${account.address}/${reciever}/${ipfsMsgID}`
            );
          addMsg(msgFromDB);
          // socket work goes here
          const transferTx = substr.tx.balances.transfer(
            encodeAddress(ADVERT_BENEFICIAR, 28),
            MSG_COST * BALANCE_DIVISOR
          );
          const signer = await getSigner(account.address);
          if (!signer) return reject();
          await transferTx.signAsync(account.address, { signer });
          await getTxEventIds(transferTx);
          const { partialFee } = await transferTx.paymentInfo(account.address);
          axios.post(`${REST_API}/transaction/new`, {
            accountId: account.address,
            desc: 11,
            kind: false,
            amount:
              MSG_COST +
              +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
          });
          axios.put(
            `${REST_API}/chat/${account.address}/${reciever}/${ipfsMsgID}/${msgFromDB.message_id}`
          );
          // socket work goes here
          resolve(true);
        } catch (err) {
          if ((err = "INSUFFICIENT BALANCE")) {
            toast.error(noFunds[language]);
          }
          reject();
        }
      });
      toast.promise(messagePromise, {
        loading: msgPromise.loading[language],
        success: msgPromise.success[language],
        error: msgPromise.error[language],
      });
    };

    return (
        <ChatContext.Provider value={{
            currChat, 
            setCurrChat, 
            resetChat, 
            sendMessage
        }}>
            {children}
        </ChatContext.Provider>
    );
};
