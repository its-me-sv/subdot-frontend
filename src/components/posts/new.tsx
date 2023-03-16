import React, {useState} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
    Container, Box, 
    CloseIcon, Title
} from "../terms-privacy/styles";
import {
    InputsForm, InputContainer,
    InputLabel
} from "../advertise/styles";
import {PostDescription} from "./styles";
import {
  newPost, desc,
  descPh, pict,
  post
} from "../../translations/posts";
import {
  fileBig,
  emptyFlds,
  hugeDesc,
  noFunds,
  newPostTrans
} from "../../translations/toast";

import {Button} from "../../utils/styles";

import {useAppContext} from "../../contexts/app";
import { Detail } from "../peek/styles";
import { useSubsocial } from "../../subsocial";
import { useUserContext } from "../../contexts/user";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { getSigner, getTxEventIds } from "../../subsocial/polkadot";
import axios from "axios";
import { BALANCE_DIVISOR, REST_API } from "../../utils/constants";

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
    const navigate = useNavigate();
    const {setPostMenuOpen, language, dark, setLowBalance} = useAppContext();
    const {api} = useSubsocial();
    const {spaceId, account, setReputation, user} = useUserContext();
    const [description, setDesccription] = useState<string>("");
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [pp, setPp] = useState<{ file: File; preview: string } | null>(null);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files) return;
      let file = e.target.files[0];
      if (file.size > 4404019) return toast.error(fileBig[language]);
      let reader = new FileReader();
      reader.onloadend = () => {
        setPp({
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
      if (!api || !account || !user) return;
      if (!description.length) return toast.error(emptyFlds[language]);
      if (description.length > 500) return toast.error(hugeDesc[language]);
      const newPostPromise = new Promise(async (resolve, reject) => {
        try {

          setInProgress(true);
          const postData = {
            description,
            picture: "",
          };
          if (pp) {
            const ppId = await api.ipfs.saveFile(pp.file);
            postData.picture = ppId;
          }
          const cid = await api.ipfs.saveContent({...postData});
          const substrateApi = await api.blockchain.api;
          const postTx = substrateApi.tx.posts.createPost(
            spaceId,
            {RegularPost: null},
            IpfsContent(cid)
          );
          const signer = await getSigner(account.address);
          if (!signer) {
            setInProgress(false);
            return reject();
          }
          await postTx.signAsync(account.address, {signer});
          await getTxEventIds(postTx);
          axios.put(`${REST_API}/user/incr-rp/${account.address}/1`);
          const {partialFee} = await postTx.paymentInfo(account.address);
          axios.post(`${REST_API}/transaction/new`, {
            accountId: account.address,
            desc: 8,
            kind: false,
            amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
          });
          setInProgress(false);
          return resolve(true);
        } catch (err) {
          if ((err = "INSUFFICIENT BALANCE")) {
            toast.error(noFunds[language]);
            setLowBalance!(true);
          }
          setInProgress(false);
          return reject();
        }
      });
      toast.promise(newPostPromise, {
        loading: newPostTrans.loading[language],
        success: newPostTrans.success[language],
        error: newPostTrans.error[language]
      });
      newPostPromise
      .then(() => {
        setReputation!(prev => prev + 1);
        navigate(`/profile/${user.username}`);
        setPostMenuOpen!(false);
      });
    };

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setPostMenuOpen!(false)} dark={dark}>
            X
          </CloseIcon>
          <Title dark={dark}>{newPost[language]}</Title>
          <InputsForm>
            <InputLabel dark={dark}>{desc[language]}</InputLabel>
            <PostDescription
              dark={dark}
              rows={4}
              placeholder={descPh[language]}
              value={description}
              onChange={(e) => setDesccription(e.target.value)}
            />
            <InputContainer>
              <InputLabel dark={dark}>{pict[language]}</InputLabel>
              <Detail
                dark={dark}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImage}
              />
            </InputContainer>
            {pp !== null && <img alt="picture" src={pp.preview} />}
          </InputsForm>
          {inProgress ? (
            <span>Post creation in progress</span>
          ) : (
            <Button
              bgColor={dark ? "#ffffff" : "#222222"}
              dark={dark}
              onClick={handleSubmit}
            >
              {post[language]}
            </Button>
          )}
        </Box>
      </Container>
    );
};

export default NewPost;
