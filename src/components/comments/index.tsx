import React, {useState, useEffect, useRef} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { idToBn } from "@subsocial/utils";
import { encodeAddress } from "@polkadot/util-crypto";

import {Container, Box, CloseIcon, Title} from "../terms-privacy/styles";
import {CommentsHolder} from "./styles";
import {title} from "../../translations/comments";

import Comment from "./comment";
import CommentInput from "./input";

import {useAppContext} from "../../contexts/app";
import { useSubsocial } from "../../subsocial";
import { getSigner, getTxEventIds } from "../../subsocial/polkadot";
import { useUserContext } from "../../contexts/user";
import { BALANCE_DIVISOR, REST_API } from "../../utils/constants";

interface CommentsProps {
  postId: string;
  dark: boolean
}

interface PostComment {
  creator: string;
  createdAt: number;
  id: string;
  body: string;
}

const Comments: React.FC<CommentsProps> = ({postId, dark}) => {
    const {
      setCmtOpen, language, 
      setLowBalance
    } = useAppContext();
    const {api} = useSubsocial();
    const {account} = useUserContext();
    const [posting, setPosting] = useState<boolean>(false);
    const [comments, setComments] = useState<Array<PostComment>>([]);
    const fetching = useRef<boolean>(false);

    const fetchData = async () => {
      if (!api || !postId || fetching.current) return;
      const cmtsPromise = new Promise(async (resolve, reject) => {
        try {
          fetching.current = true;
          const cmtIds = await api.blockchain.getReplyIdsByPostId(idToBn(postId));
          const cmts = await api.findPublicPosts(cmtIds);
          const prettyCmts = cmts.map((cmt) => ({
            creator: encodeAddress(cmt.struct.createdByAccount, 42),
            createdAt: cmt.struct.createdAtTime,
            id: cmt.struct.id,
            body: cmt.content?.body || "",
          }));
          setComments(prettyCmts);
          fetching.current = false;
          resolve(true);
        } catch (err) {
          fetching.current = false;
          reject();
        }
      });
      toast.promise(cmtsPromise, {
        loading: "Fetching comments",
        success: "Comments fetched",
        error: "Unable to fetch comments"
      });
    };

    const addComment = (newCmt: string) => {
      if (!api || !account || !postId) return;
      if (newCmt.length === 0) return toast.error("Field empty"); 
      if (newCmt.length > 210) return toast.error("Comment too long");
      const cmtPromise = new Promise(async (resolve, reject) => {
        try {
          setPosting(true);
          const cid = await api.ipfs.saveContent({
            body: newCmt
          });
          const substrateApi = await api.substrateApi;
          const cmtTx = substrateApi.tx.posts.createPost(
            null,
            {Comment: {parentId: null, rootPostId: postId}},
            IpfsContent(cid)
          );
          const signer = await getSigner(account.address);
          if (!signer) {
            setPosting(false);
            return reject();
          }
          await cmtTx.signAsync(account.address, {signer});
          const cmtTxIds = await getTxEventIds(cmtTx);
          const { partialFee } = await cmtTx.paymentInfo(account.address);
          axios.post(`${REST_API}/transaction/new`, {
            accountId: account.address,
            desc: "Added comment to a post",
            kind: false,
            amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
          });
          setComments([...comments, {
            creator: account.address,
            createdAt: Date.now(),
            body: newCmt,
            id: cmtTxIds[0]
          }]);
          setPosting(false);
          return resolve(true);
        } catch (err) {
          if ((err = "INSUFFICIENT BALANCE")) {
            toast.error(
              "Your account has insufficient funds to complete this transaction"
            );
            setLowBalance!(true);
          }
          setPosting(false);
          return reject();
        }
      });
      toast.promise(cmtPromise, {
        loading: "Posting comment",
        success: "Comment posted",
        error: "Unable to post comment",
      });
    };

    useEffect(() => {
      fetchData();
    }, [api, postId]);

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => {
            setComments!([]);
            setCmtOpen!("");
          }} 
            dark={dark}
          >X</CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <CommentsHolder>
            {comments.length === 0 && <span>No commments yet.</span>}
            {[...comments].reverse().map((cmt) => (
              <Comment key={cmt.id} comment={cmt} />
            ))}
          </CommentsHolder>
          {!posting && (
            <CommentInput addComment={addComment} />
          )}
        </Box>
      </Container>
    );
};

export default Comments;
