import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { encodeAddress } from "@polkadot/util-crypto";
import axios from "axios";
import {toast} from "react-hot-toast";
import { idToBn } from "@subsocial/utils";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";

import { BALANCE_DIVISOR, REST_API } from "../../utils/constants";

import { postPage } from "../../translations/page-titles";
import { PostComment, User, UserPost, UserPostMeta } from "../../utils/types";
import { defaultPost, defaultUser, defaultUserPostMeta } from "../../components/posts/data";

import { getSigner, getTxEventIds } from "../../subsocial/polkadot";
import {
  cmtLong,
  cmtPost,
  cmtsFetch,
  emptyFlds,
  noFunds,
  postDislike,
  postLike,
} from "../../translations/toast";
import { Box, CommentsHolder } from "../../components/comments/styles";
import {
    FetchButton,
  FooterItem,
  PostContent,
  PostFooter,
  PostHeader,
  PostHeaderRight,
  PostImage,
  PostTime,
  PostUsername,
} from "../../components/posts/styles";
import { getImage } from "../../utils/utils";
import { copyUrl, ftrBtns, posted } from "../../translations/posts";
import { format } from "timeago.js";
import { noCmts } from "../../translations/comments";
import CommentInput from "../../components/comments/input";
import Comment from "../../components/comments/comment";
import {Container} from './styles';

import { useAppContext } from "../../contexts/app";
import { useSubsocial } from "../../subsocial";
import { useUserContext } from "../../contexts/user";
import { useSocketContext } from "../../contexts/socket";
import skeleton from "../../assets/loader.gif";

import likeIcon from "../../assets/icons/like1.png";
import likedIcon from "../../assets/icons/liked1.png";
import cmtIcon from "../../assets/icons/comment1.png";
import shareIcon from "../../assets/icons/share.png";
import shareIcon1 from "../../assets/icons/share1.png";
import tipIcon from "../../assets/icons/tip1.png";
import tipIcon1 from "../../assets/icons/tip.png";

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { api } = useSubsocial();
    const postId = params.id;
    const { 
        language, setLowBalance, 
        setTransferId, loggedIn,
        dark
    } = useAppContext();
    const { account, user } = useUserContext();
    const { socket } = useSocketContext();
    const [posting, setPosting] = useState<boolean>(false);
    const [comments, setComments] = useState<Array<PostComment>>([]);
    const [postMeta, setPostMeta] = useState<UserPostMeta>(defaultUserPostMeta);
    const [likedId, setLikeId] = useState<string>("0");
    const [post, setPost] = useState<UserPost>(defaultPost);
    const [onwerId, setOwnerId] = useState<string>("");
    const [fetching, setFetching] = useState<boolean>(false);
    const [owner, setOwner] = useState<User>(defaultUser);
    const [cmtsLen, setCmtsLen] = useState<number>(0);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [tipHover, setTipHover] = useState<boolean>(false);
    const [shareHover, setShareHover] = useState<boolean>(false);

    const fetchData = async () => {
      if (!api || !postId) return;
      try {
        setFetching(true);
        const post = await api.findPost({ id: postId });
        if (!post?.content || !post) {
          setFetching(false);
          setNotFound(true);
          return;
        }
        setNotFound(false);
        setPost(post.content as unknown as UserPost);
        setPostMeta({
          likes: post.struct.upvotesCount,
          createdAt: post.struct.createdAtTime,
        });
        setOwnerId(encodeAddress(post.struct.ownerId, 42));
        api.base
          .findProfileSpace(post.struct.createdByAccount)
          .then((profile) => {
            if (!profile?.content) return;
            setOwner(profile.content as unknown as User);
          });
        const cmtIds = await api.blockchain.getReplyIdsByPostId(idToBn(postId));
        const cmts = await api.findPublicPosts(cmtIds);
        setCmtsLen(cmts.length);
        if (account) {
            api.blockchain
              .getReactionIdsByAccount(account.address, [postId])
              .then((reactData) => {
                setLikeId(reactData[0].toString());
              });
        }
        const cmtsPromise = new Promise(async (resolve, reject) => {
          try {
            setFetching(true);
            const cmtIds = await api.blockchain.getReplyIdsByPostId(
              idToBn(postId)
            );
            const cmts = await api.findPublicPosts(cmtIds);
            const prettyCmts = cmts.map((cmt) => ({
              creator: encodeAddress(cmt.struct.createdByAccount, 42),
              createdAt: cmt.struct.createdAtTime,
              id: cmt.struct.id,
              body: cmt.content?.body || "",
            }));
            setComments(prettyCmts);
            setFetching(false);
            resolve(true);
          } catch (err) {
            setFetching(false);
            reject();
          }
        });
        toast.promise(cmtsPromise, {
          loading: cmtsFetch.loading[language],
          success: cmtsFetch.success[language],
          error: cmtsFetch.error[language],
        }, {id: "cmts"});
        cmtsPromise.then(() => setFetching(false));
      } catch (err) {
        setFetching(false);
      }
    };

    const toggleLike = async () => {
      if (!loggedIn) {
        window.alert("Create an account today");
        return;
      }
      if (!api || !postId || !account?.address || !loggedIn) return;
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

    const addComment = (newCmt: string, cb: () => void) => {
        if (!loggedIn) {
            window.alert("Create an account today");
            return;
        }
      if (!api || !account || !postId || !loggedIn) return;
      if (newCmt.length === 0) return toast.error(emptyFlds[language]);
      if (newCmt.length > 210) return toast.error(cmtLong[language]);
      const cmtPromise = new Promise(async (resolve, reject) => {
        try {
          cb();
          setPosting(true);
          const cid = await api.ipfs.saveContent({
            body: newCmt,
          });
          const substrateApi = await api.substrateApi;
          const cmtTx = substrateApi.tx.posts.createPost(
            null,
            { Comment: { parentId: null, rootPostId: postId } },
            IpfsContent(cid)
          );
          const signer = await getSigner(account.address);
          if (!signer) {
            setPosting(false);
            return reject();
          }
          await cmtTx.signAsync(account.address, { signer });
          const cmtTxIds = await getTxEventIds(cmtTx);
          const { partialFee } = await cmtTx.paymentInfo(account.address);
          axios.post(`${REST_API}/transaction/new`, {
            accountId: account.address,
            desc: 0,
            kind: false,
            amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
          });
          setComments([
            ...comments,
            {
              creator: account.address,
              createdAt: Date.now(),
              body: newCmt,
              id: cmtTxIds[0],
            },
          ]);
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

    const onProfileClick = () => {
        if (!loggedIn) {
            window.alert("Create an account today");
            return;
        }
        navigate(`/profile/${owner.username}`)
    };

    const onTransferClick = () => {
        if (!loggedIn) {
          window.alert("Create an account today");
          return;
        }
        setTransferId!(`${onwerId}:${owner.username}`);
    };

    const onShareClick = () => {
        const shareUrl = `${window.location.origin}/#/post/${postId}`;
        navigator.clipboard
          .writeText(shareUrl)
          .then(() => toast(copyUrl[language], { icon: "🚀", id: "share" }));
    };

    useEffect(() => {
        window.document.title = `${postPage[language]} / Subdot`;
    }, [language]);

    useEffect(() => {
        fetchData();
    }, [api, postId]);

    if (notFound) {
        return (
            <Container dark={dark}>
                Page doesn't exist
            </Container>
        );
    }

    return (
      <Container dark={dark}>
        <Box dark={dark} onClick={(event) => event.stopPropagation()}>
          {fetching ? (
            <img src={skeleton} alt="skeleton loading" />
          ) : (
            <>
              <PostHeader>
                <div onClick={onProfileClick}>
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
                <FetchButton
                  onClick={fetchData}
                  title="Refetch data"
                  dark={dark}
                >
                  {fetching ? "⏱️" : "↺"}
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
                  onClick={onTransferClick}
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
                  <img
                    alt="share"
                    src={shareHover ? shareIcon1 : shareIcon}
                  />
                  <span>{ftrBtns.share[language]}</span>
                </FooterItem>
              </PostFooter>
              <CommentsHolder onClick={(event) => event.stopPropagation()}>
                {comments.length === 0 && <span>{noCmts[language]}</span>}
                {[...comments].reverse().map((cmt) => (
                  <Comment key={cmt.id} comment={cmt} />
                ))}
              </CommentsHolder>
              <CommentInput addComment={addComment} />
            </>
          )}
        </Box>
      </Container>
    );
};

export default PostPage;
