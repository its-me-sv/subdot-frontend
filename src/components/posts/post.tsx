import React, {useEffect, useState} from "react";
import {format} from "timeago.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {idToBn} from "@subsocial/utils";
import axios from "axios";
import {encodeAddress} from "@polkadot/util-crypto";

import {
  FetchButton,
    FooterItem, PostContainer, 
    PostContent, PostFooter, 
    PostHeader, PostHeaderRight, 
    PostImage, PostTime, 
    PostUsername,
} from './styles';
import likeIcon from "../../assets/icons/like1.png";
import likedIcon from "../../assets/icons/liked1.png";
import cmtIcon from "../../assets/icons/comment1.png";
import shareIcon from "../../assets/icons/share.png";
import shareIcon1 from "../../assets/icons/share1.png";
import tipIcon from "../../assets/icons/tip1.png";
import tipIcon1 from "../../assets/icons/tip.png";
import { posted, ftrBtns } from "../../translations/posts";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import {useSocketContext} from "../../contexts/socket";

import {UserPost, User, UserPostMeta, PostOpen} from "../../utils/types";
import {useSubsocial} from "../../subsocial";
import {getImage} from "../../utils/utils";

import {defaultUser, defaultPost, defaultUserPostMeta} from "./data";
import {getSigner, getTxEventIds} from "../../subsocial/polkadot";
import {BALANCE_DIVISOR, REST_API} from "../../utils/constants";
import { noFunds, postDislike, postLike } from "../../translations/toast";
import skeleton from "../../assets/loader.gif";

interface PostProps {
  postId: string;
}

const Post: React.FC<PostProps> = ({postId}) => {
    const navigate = useNavigate();
    const {
        setTransferId,
        language, dark, setCmtOpen,
        setLowBalance
    } = useAppContext();
    const {api} = useSubsocial();
    const {account, user} = useUserContext();
    const {socket} = useSocketContext();
    const [post, setPost] = useState<UserPost>(defaultPost);
    const [owner, setOwner] = useState<User>(defaultUser);
    const [onwerId, setOwnerId] = useState<string>("");
    const [postMeta, setPostMeta] = useState<UserPostMeta>(defaultUserPostMeta);
    const [cmtsLen, setCmtsLen] = useState<number>(0);
    const [likedId, setLikeId] = useState<string>("0");
    const [fetching, setFetching] = useState<boolean>(false);

    const fetchData = async () => {
        if (!api || !postId || !account || fetching) return;
        try {
          setFetching(true);
          const post = await api.findPost({id: postId});
          if (!post?.content) {
            setFetching(false);
            return;
          }
          setPost(post.content as unknown as UserPost);
          setPostMeta({
              likes: post.struct.upvotesCount,
              createdAt: post.struct.createdAtTime
          });
          setOwnerId(encodeAddress(post.struct.ownerId, 42));
          api.base.findProfileSpace(post.struct.createdByAccount)
          .then(profile => {
              if (!profile?.content) return;
              setOwner(profile.content as unknown as User);
          });
          const cmtIds = await api.blockchain.getReplyIdsByPostId(idToBn(postId));
          const cmts = await api.findPublicPosts(cmtIds);
          setCmtsLen(cmts.length);
          api.blockchain.getReactionIdsByAccount(account.address, [postId])
          .then((reactData) => {
            setLikeId(reactData[0].toString());
          });
          setFetching(false);
        } catch (err) {
          setFetching(false);
        }
    };

    const toggleLike = async () => {
      if (!api || !postId || !account?.address) return;
      if (likedId === "0") {
        const substrateApi = await api.blockchain.api;
        const likeTx = substrateApi.tx.reactions.createPostReaction(postId, "Upvote");
        const likePromise = new Promise(async (resolve, reject) => {
          try {
            const signer = await getSigner(account.address);
            if (!signer) return reject();
            await likeTx.signAsync(account.address, {signer});
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
            const {partialFee} = await likeTx.paymentInfo(account.address);
            axios.post(`${REST_API}/transaction/new`, {
              accountId: account.address,
              desc: 6,
              kind: false,
              amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
            });
            setPostMeta(prevMeta => ({
              ...prevMeta,
              likes: prevMeta.likes + 1
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
          loading: postLike.loading[language]
        });
      } else {
        const substrateApi = await api.blockchain.api;
        const disLikeTx = substrateApi.tx.reactions.deletePostReaction(postId, likedId);
        const disLikePromise = new Promise(async (resolve, reject) => {
          try {
            const signer = await getSigner(account.address);
            if (!signer) return reject();
            await disLikeTx.signAsync(account.address, { signer });
            await getTxEventIds(disLikeTx);
            setLikeId("0");
            const {partialFee} = await disLikeTx.paymentInfo(account.address);
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
          loading: postDislike.loading[language]
        });
      }
    };

    const onCommentsClick = () => {
      let postOpenObj: PostOpen = {
        postId,
        post,
        owner,
        ownerId: onwerId,
        postMeta,
        cmtsLen,
        likedId
      };
      setCmtOpen!(postOpenObj);
    };

    const onShareClick = () => {
      const shareUrl = `${window.location.origin}/#/post/${postId}`;
      navigator.clipboard
        .writeText(shareUrl)
        .then(() =>
          toast("Post link copied to clipboard", { icon: "🚀", id: "share" })
        );
    };

    useEffect(() => {
      fetchData();
    }, [api, postId]);

    return (
      <PostContainer dark={dark}>
        {fetching ? (
          <img src={skeleton} alt="skeleton loading" />
        ) : (
          <>
            <PostHeader>
              <div onClick={() => navigate(`/profile/${owner.username}`)}>
                <img
                  alt={`pp of ${owner.username}`}
                  src={getImage(owner.picture)}
                />
                <PostHeaderRight dark={dark}>
                  {owner.username === "--------" ? (
                    <img src={skeleton} alt="skeleton loading" />
                  ) : (
                    <PostUsername>{owner.username}</PostUsername>
                  )}
                  <PostTime title={new Date(postMeta.createdAt).toString()}>
                    {posted[language]} {format(new Date(postMeta.createdAt))}
                  </PostTime>
                </PostHeaderRight>
              </div>
              <FetchButton onClick={fetchData} title="Refetch data" dark={dark}>
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
              <FooterItem
                title={ftrBtns.comment[language]}
                dark={dark}
                onClick={onCommentsClick}
              >
                <img alt="comment" src={cmtIcon} />
                {cmtsLen > 0 && <span>{cmtsLen}</span>}
              </FooterItem>
              <FooterItem
                title={ftrBtns.tip[language]}
                dark={dark}
                onClick={() => setTransferId!(`${onwerId}:${owner.username}`)}
              >
                <img
                  alt="tip"
                  src={tipIcon}
                  onMouseOut={(e) => (e.currentTarget.src = tipIcon)}
                  onMouseOver={(e) => (e.currentTarget.src = tipIcon1)}
                />
                <span>{ftrBtns.tip[language]}</span>
              </FooterItem>
              <FooterItem
                title={ftrBtns.share[language]}
                dark={dark}
                onClick={onShareClick}
              >
                <img
                  alt="share"
                  src={shareIcon}
                  onMouseOut={(e) => (e.currentTarget.src = shareIcon)}
                  onMouseOver={(e) => (e.currentTarget.src = shareIcon1)}
                />
                <span>{ftrBtns.share[language]}</span>
              </FooterItem>
            </PostFooter>
          </>
        )}
      </PostContainer>
    );
};

export default Post;
