import React, {useState} from "react";
import toast from "react-hot-toast";
import {encodeAddress} from "@polkadot/util-crypto";
import axios from "axios";

import {Box, Container, CloseIcon, Title} from "../terms-privacy/styles";
import {
  title, 
  duration,
  link,
  linkPh, pict as pictTxt,
  pictPh, cost,
  costPh, postAdvert
} from "../../translations/advert";

import {Button} from "../../utils/styles";
import {InputContainer, InputLabel, Input, InputsForm} from "./styles";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import { useSubsocial } from "../../subsocial";
import { ADVERT_BENEFICIAR, ADVERT_COST, BALANCE_DIVISOR, REST_API } from "../../utils/constants";
import { getSigner, getTxEventIds } from "../../subsocial/polkadot";
import { dummyLink, dummyPicture } from "../../data/advert";

interface AdvertiseProps {}

const Advertise: React.FC<AdvertiseProps> = () => {
    const {setAdvertMenuOpen, language, dark, setAdvert} = useAppContext();
    const {account} = useUserContext();
    const {api} = useSubsocial();
    const [lnk, setLnk] = useState<string>(dummyLink);
    const [pict, setPict] = useState<string>(dummyPicture);
    const [durt, setDurt] = useState<number>(1)
    const [cst, setCst] = useState<number>(2);

    const handleDuratChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const durtVal = e.target.value;
      setDurt(+durtVal);
      if (!durtVal.includes(".")) setCst((+durtVal) * ADVERT_COST);
      else setCst(0);
    };

    const handleSubmit = async () => {
      if (!lnk.length || !pict.length) {
        return toast.error("Field(s) empty");
      }
      if (!api || !account) return;
      const substr = await api.substrateApi;
      const transferTx = substr.tx.balances.transfer(
        encodeAddress(ADVERT_BENEFICIAR, 28),
        cst * BALANCE_DIVISOR
      );
      const transferPromise = new Promise(async (resolve, reject) => {
        try {
          const signer = await getSigner(account.address);
          if (!signer) return reject();
          await transferTx.signAsync(account.address, { signer });
          await getTxEventIds(transferTx);
          const { partialFee } = await transferTx.paymentInfo(account.address);
          axios.post(`${REST_API}/transaction/new`, {
            accountId: account.address,
            desc: "Advertisement cost",
            kind: false,
            amount:
              cst + +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
          });
          const {data} = await axios.post(`${REST_API}/advert/new`, {
            accountId: account.address,
            picture: pict,
            link: lnk,
            expires: (new Date(Date.now() + (60000 * durt))).toISOString()
          });
          setAdvert!(data);
          setAdvertMenuOpen!(false);
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
        loading: "Posting advertisement",
        success: "Advertisement on Air",
        error: "Unable to post advertisement"
      });
    };

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setAdvertMenuOpen!(false)} dark={dark}>
            X
          </CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <InputsForm>
            <InputContainer>
              <InputLabel dark={dark}>{link[language]}</InputLabel>
              <Input
                dark={dark}
                type="text"
                placeholder={linkPh[language]}
                value={lnk}
                onChange={(e) => setLnk(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel dark={dark}>{pictTxt[language]}</InputLabel>
              <Input
                dark={dark}
                type="text"
                placeholder={pictPh[language]}
                value={pict}
                onChange={(e) => setPict(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel dark={dark}>{duration[language]} (mins)</InputLabel>
              <Input 
                dark={dark} 
                type="number" 
                value={durt}
                onChange={handleDuratChange}
                placeholder="Duration in minutes" 
              />
            </InputContainer>
            <InputContainer>
              <InputLabel dark={dark}>{cost[language]} ({ADVERT_COST} SOON/min)</InputLabel>
              <Input
                dark={dark}
                type="number"
                placeholder={costPh[language]}
                readOnly
                value={cst}
              />
            </InputContainer>
          </InputsForm>
          {!(!cst || !lnk.length || !pict.length) && (
            <Button 
              bgColor={dark ? "#f5f4f9" : "#1a1a1a"} 
              dark={dark}
              onClick={handleSubmit}
            >
              {postAdvert[language]}
            </Button>
          )}
        </Box>
      </Container>
    );
};

export default Advertise;
