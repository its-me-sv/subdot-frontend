import React, {useState, useEffect, useRef} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { idToBn } from "@subsocial/utils";
import { encodeAddress } from "@polkadot/util-crypto";
import { format } from "timeago.js";

import {Container} from "../terms-privacy/styles";
import {CommentsHolder, Box, PostImage} from "./styles";
import {
  cmtsFetch, emptyFlds, 
  cmtLong, noFunds,
  cmtPost,
  postDislike,
  postLike
} from "../../translations/toast";

import Comment from "./comment";
import CommentInput from "./input";

import {useAppContext} from "../../contexts/app";
import { useSubsocial } from "../../subsocial";
import { getSigner, getTxEventIds } from "../../subsocial/polkadot";
import { useUserContext } from "../../contexts/user";
import { BALANCE_DIVISOR, REST_API } from "../../utils/constants";
import { PostComment, PostOpen, UserPostMeta } from "../../utils/types";
import { getImage } from "../../utils/utils";
import { FetchButton, FooterItem, PostContent, PostFooter, PostHeader, PostHeaderRight, PostTime, PostUsername } from "../posts/styles";
import { useNavigate } from "react-router-dom";
import { ftrBtns, posted } from "../../translations/posts";

import likeIcon from "../../assets/icons/like1.png";
import likedIcon from "../../assets/icons/liked1.png";
import cmtIcon from "../../assets/icons/comment1.png";
import shareIcon from "../../assets/icons/share.png";
import shareIcon1 from "../../assets/icons/share1.png";
import tipIcon from "../../assets/icons/tip1.png";
import tipIcon1 from "../../assets/icons/tip.png";
import { noCmts } from "../../translations/comments";
import { useSocketContext } from "../../contexts/socket";

interface CommentsProps {
  postOpen: PostOpen;
  dark: boolean
}

const Comments: React.FC<CommentsProps> = ({postOpen, dark}) => {
    const navigate = useNavigate();
    const {
      postId,
      post,
      owner,
      ownerId: onwerId,
      cmtsLen,
    } = postOpen;
    const {
      setCmtOpen, language, 
      setLowBalance, setTransferId
    } = useAppContext();
    const {api} = useSubsocial();
    const {account, user} = useUserContext();
    const {socket} = useSocketContext();
    const [posting, setPosting] = useState<boolean>(false);
    const [comments, setComments] = useState<Array<PostComment>>([]);
    const [postMeta, setPostMeta] = useState<UserPostMeta>(postOpen.postMeta);
    const [likedId, setLikeId] = useState<string>(postOpen.likedId);
    const [tipHover, setTipHover] = useState<boolean>(false);
    const [shareHover, setShareHover] = useState<boolean>(false);

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
        loading: cmtsFetch.loading[language],
        success: cmtsFetch.success[language],
        error: cmtsFetch.error[language]
      });
    };

    const addComment = (newCmt: string, cb: () => void) => {
      if (!api || !account || !postId) return;
      if (newCmt.length === 0) return toast.error(emptyFlds[language]); 
      if (newCmt.length > 210) return toast.error(cmtLong[language]);
      const cmtPromise = new Promise(async (resolve, reject) => {
        try {
          cb();
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
            desc: 0,
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
            toast.error(noFunds[language]);
            setLowBalance!(true);
          }
          setPosting(false);
          return reject();
        }
      });
      toast.promise(cmtPromise, {
        loading: cmtPost.loading[language],
        success: cmtPost.success[language],
        error: cmtPost.error[language],
      });
    };

    const closeView = () => {
      setComments!([]);
      setCmtOpen!(null);
    };

    const onShareClick = () => {
      const shareUrl = `${window.location.origin}/#/post/${postId}`;
      navigator.clipboard
        .writeText(shareUrl)
        .then(() =>
          toast("Post link copied to clipboard", { icon: "🚀", id: "share" })
        );
    };

    const toggleLike = async () => {
      if (!api || !postId || !account?.address) return;
      if (likedId === "0") {
        const substrateApi = await api.blockchain.api;
        const likeTx = substrateApi.tx.reactions.createPostReaction(
          postId,
          "Upvote"
        );
        const likePromise = new Promise(async (resolve, reject) => {
          try {
            const signer = await getSigner(account.address);
            if (!signer) return reject();
            await likeTx.signAsync(account.address, { signer });
            const likeTxIds = await getTxEventIds(likeTx);
            if (!likeTxIds) return reject();
            setLikeId(likeTxIds[1]);
            axios.put(`${REST_API}/user/incr-rp/${onwerId}/1`);
            axios.put(`${REST_API}/user/all-time-stats/${onwerId}/ac/1`);
            socket.emit(
              "notify",
              onwerId,
              `${user?.username} liked your post (+1 RP)`
            );
            socket.emit("incrRP", onwerId, String(1));
            const { partialFee } = await likeTx.paymentInfo(account.address);
            axios.post(`${REST_API}/transaction/new`, {
              accountId: account.address,
              desc: 6,
              kind: false,
              amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
            });
            setPostMeta((prevMeta) => ({
              ...prevMeta,
              likes: prevMeta.likes + 1,
            }));
            resolve(true);
          } catch (err) {
            if ((err = "INSUFFICIENT BALANCE")) {
              toast.error(noFunds[language]);
              setLowBalance!(true);
            }
            return reject();
          }
        });
        toast.promise(likePromise, {
          success: postLike.success[language],
          error: postLike.error[language],
          loading: postLike.loading[language],
        });
      } else {
        const substrateApi = await api.blockchain.api;
        const disLikeTx = substrateApi.tx.reactions.deletePostReaction(
          postId,
          likedId
        );
        const disLikePromise = new Promise(async (resolve, reject) => {
          try {
            const signer = await getSigner(account.address);
            if (!signer) return reject();
            await disLikeTx.signAsync(account.address, { signer });
            await getTxEventIds(disLikeTx);
            setLikeId("0");
            const { partialFee } = await disLikeTx.paymentInfo(account.address);
            axios.post(`${REST_API}/transaction/new`, {
              accountId: account.address,
              desc: 1,
              kind: false,
              amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
            });
            setPostMeta((prevMeta) => ({
              ...prevMeta,
              likes: prevMeta.likes - 1,
            }));
            resolve(true);
          } catch (err) {
            if ((err = "INSUFFICIENT BALANCE")) {
              toast.error(noFunds[language]);
              setLowBalance!(true);
            }
            return reject();
          }
        });
        toast.promise(disLikePromise, {
          success: postDislike.success[language],
          error: postDislike.error[language],
          loading: postDislike.loading[language],
        });
      }
    };

    useEffect(() => {
      fetchData();
    }, [api, postId]);

    return (
      <Container dark={dark} onClick={closeView}>
        <Box dark={dark} onClick={(event) => event.stopPropagation()}>
          <PostHeader>
            <div onClick={() => navigate(`/profile/${owner.username}`)}>
              <img
                alt={`pp of ${owner.username}`}
                src={getImage(owner.picture)}
              />
              <PostHeaderRight dark={dark}>
                <PostUsername>{owner.username}</PostUsername>
                <PostTime title={new Date(postMeta.createdAt).toString()}>
                  {posted[language]} {format(new Date(postMeta.createdAt))}
                </PostTime>
              </PostHeaderRight>
            </div>
            <FetchButton onClick={closeView} dark={dark}>
              X
            </FetchButton>
          </PostHeader>
          <PostContent dark={dark}>{post.description}</PostContent>
          {post.picture.length > 0 && (
            <PostImage alt="content" src={getImage(post.picture)} />
          )}
          <PostFooter>
            <FooterItem dark={dark} title={ftrBtns.like[language]}>
              <img
                alt="like"
                src={likedId === "0" ? likeIcon : likedIcon}
                onClick={toggleLike}
              />
              {postMeta.likes > 0 && <span>{postMeta.likes}</span>}
            </FooterItem>
            <FooterItem title={ftrBtns.comment[language]} dark={dark}>
              <img alt="comment" src={cmtIcon} />
              {cmtsLen > 0 && <span>{cmtsLen}</span>}
            </FooterItem>
            <FooterItem
              title={ftrBtns.tip[language]}
              dark={dark}
              onClick={() => setTransferId!(`${onwerId}:${owner.username}`)}
              onMouseOut={() => setTipHover(false)}
              onMouseOver={() => setTipHover(true)}
            >
              <img alt="tip" src={tipHover ? tipIcon1 : tipIcon} />
              <span>{ftrBtns.tip[language]}</span>
            </FooterItem>
            <FooterItem
              title={ftrBtns.share[language]}
              dark={dark}
              onClick={onShareClick}
              onMouseOut={() => setShareHover(false)}
              onMouseOver={() => setShareHover(true)}
            >
              <img alt="share" src={shareHover ? shareIcon1 : shareIcon} />
              <span>{ftrBtns.share[language]}</span>
            </FooterItem>
          </PostFooter>
          <CommentsHolder>
            {comments.length === 0 && <span>{noCmts[language]}</span>}
            {[...comments].reverse().map((cmt) => (
              <Comment key={cmt.id} comment={cmt} />
            ))}
          </CommentsHolder>
          <CommentInput addComment={addComment} />
        </Box>
      </Container>
    );
};

export default Comments;
