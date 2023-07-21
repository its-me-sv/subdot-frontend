import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/app";
import { PostContainer, PostDescription, PostFooter, PostHeader, PostHeaderRight, PostImage, PostTime, PostUsername } from "./styles";
import { useUserContext } from "../../contexts/user";
import { getImage } from "../../utils/utils";
import { BALANCE_DIVISOR, DICE_BEAR, REST_API } from "../../utils/constants";
import skeleton from "../../assets/loader.gif";
import { descPh, post } from "../../translations/posts";
import { useState } from "react";
import { Button } from "../../utils/styles";
import { InputContainer } from "../advertise/styles";
import { Detail } from "../peek/styles";
import { toast } from "react-hot-toast";
import { emptyFlds, fileBig, hugeDesc, newPostTrans, noFunds } from "../../translations/toast";
import axios from "axios";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { getSigner, getTxEventIds } from "../../subsocial/polkadot";
import { useSubsocial } from "../../subsocial";
import pictIcn from "../../assets/icons/picture.png";

interface PostInputProps {}

const PostInput: React.FC<PostInputProps> = () => {
    const navigate = useNavigate();
    const {dark,language, setLowBalance} = useAppContext();
    const {user, account, spaceId, setReputation} = useUserContext();
    const { api } = useSubsocial();
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
          const cid = await api.ipfs.saveContent({ ...postData });
          const substrateApi = await api.blockchain.api;
          const postTx = substrateApi.tx.posts.createPost(
            spaceId,
            { RegularPost: null },
            IpfsContent(cid)
          );
          const signer = await getSigner(account.address);
          if (!signer) {
            setInProgress(false);
            return reject();
          }
          await postTx.signAsync(account.address, { signer });
          await getTxEventIds(postTx);
          axios.put(`${REST_API}/user/incr-rp/${account.address}/1`);
          axios.put(`${REST_API}/user/all-time-stats/${account.address}/ac/1`);
          const { partialFee } = await postTx.paymentInfo(account.address);
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
        error: newPostTrans.error[language],
      });
      newPostPromise.then(() => {
        setReputation!((prev) => prev + 1);
        navigate(`/profile/${user.username}`);
      });
    };

    return (
      <PostContainer dark={dark}>
        <PostHeader>
          <div
            onClick={() => navigate(`/profile/${user?.username || "------"}`)}
          >
            <img
              alt={`pp of ${user?.username || "------"}`}
              src={getImage(user?.picture || DICE_BEAR)}
            />
            <PostHeaderRight dark={dark}>
              {user ? (
                <PostUsername>{user.username}</PostUsername>
              ) : (
                <img src={skeleton} alt="skeleton loading" />
              )}
              {user && <PostTime>{user.status}</PostTime>}
            </PostHeaderRight>
          </div>
        </PostHeader>
        <PostDescription
          dark={dark}
          rows={3}
          placeholder={descPh[language]}
          value={description}
          onChange={(e) => setDesccription(e.target.value)}
        />
        {pp !== null && <PostImage alt="content" src={pp.preview} />}
        <PostFooter>
          <InputContainer>
            <Detail
              dark={dark}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImage}
            />
          </InputContainer>
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
        </PostFooter>
      </PostContainer>
    );
};

export default PostInput;
