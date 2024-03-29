import React, {useState} from "react";
import toast from "react-hot-toast";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../contexts/app";
import { Button } from "../../utils/styles";
import { getImage } from "../../utils/utils";
import { Footer, ProfilePicture, Details, Section, Detail} from "../peek/styles";
import { ProfileEditContainer } from "./styles";

import {
  name as name1, 
  username as username1,
  editor
} from "../../translations/peek";
import { useSubsocial } from "../../subsocial";
import axios from "axios";
import { BALANCE_DIVISOR, REST_API } from "../../utils/constants";
import { User } from "../../utils/types";
import { useUserContext } from "../../contexts/user";
import { getSigner, getTxEventIds } from "../../subsocial/polkadot";
import { createAcc, emptyFlds, fileBig, noFunds, updateAcc } from "../../translations/toast";

interface ProfileEditProps {
  original: User;
  address: string;
  setter: React.Dispatch<React.SetStateAction<User>>;
  onClose: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
    original, address, onClose, setter
}) => {
    const navigate = useNavigate();
    const {dark, language, setLowBalance} = useAppContext();
    const {setUser: setCurrUser, spaceId} = useUserContext();
    const {api} = useSubsocial();
    const [picture, setPicture] = useState<string>(original.picture);
    const [username, setUsername] = useState<string>(original.username);
    const [name, setName] = useState<string>(original.name);
    const [status, setStatus] = useState<string>(original.status);
    const [pp, setPp] = useState<{ file: File; preview: string } | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

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

    const handleUpdate = async () => {
        if (!api) return;
        if (!name.length || !username.length || !status.length) {
          return toast.error(emptyFlds[language]);
        }
        if (username.length > 10) return toast.error(createAcc.unameLong[language]);
        if (status.length > 84) return toast.error(createAcc.statLong[language]);
        if (name.length > 42) return toast.error(createAcc.nameLong[language]);
        if (/^[a-zA-Z0-9]+$/.test(username) === false)
        return toast.error(createAcc.unameInvalid[language]);
        if (username !== original.username) {
            const {presence} = (await axios.get(`${REST_API}/user/username/${username}`)).data;
            if (presence) return toast.error(createAcc.unameUsed[language]);
        }
        
        setInProgress(true);
        let updatedUser: User = {
            ...original,
            picture,
            name,
            username,
            status
        };
        if (pp) {
            const ppId = await api.ipfs.saveFile(pp.file);
            updatedUser.picture = ppId;
        }
        const cid = await api.ipfs.saveContent({...updatedUser});
        const substrateApi = await api.substrateApi;
        const spaceTx = substrateApi.tx.spaces.updateSpace(spaceId, {
            content: IpfsContent(cid)
        });
        const updateProfilePromise = new Promise(async (resolve, reject) => {
          try {
            const signer = await getSigner(address);
            if (!signer) return reject();
            await spaceTx.signAsync(address, {signer});
            await getTxEventIds(spaceTx);
            const {partialFee} = await spaceTx.paymentInfo(address);
            axios.post(`${REST_API}/transaction/new`, {
              accountId: address,
              desc: 7,
              kind: false,
              amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
            });
            setCurrUser!(updatedUser);
            setter(updatedUser);
            axios.put(`${REST_API}/user/user-edit/${address}`, {
              username,
              name,
            });
            resolve(true);
          } catch (err) {
            if ((err = "INSUFFICIENT BALANCE")) {
              toast.error(noFunds[language]);
              setLowBalance!(true);
            }
            return reject();
          }
        });
        toast.promise(updateProfilePromise, {
          loading: updateAcc.loading[language],
          success: updateAcc.success[language],
          error: updateAcc.error[language],
        });
        updateProfilePromise
          .then(() => {
            setInProgress(false);
            if (username !== original.username) {
                navigate(`/profile/${username}`);
            }
            onClose();
          })
          .finally(() => setInProgress(false));
    };

    return (
      <ProfileEditContainer dark={dark}>
        <ProfilePicture
          alt={`${address.slice(5)} pp`}
          src={pp !== null ? pp.preview : getImage(picture)}
        />
        <Details>
          <Section dark={dark}>{name1[language]}</Section>
          <Detail
            dark={dark}
            type="text"
            value={name}
            placeholder="Eg: Bruce Wayne"
            onChange={(e) => setName(e.target.value)}
          />
        </Details>
        <Details>
          <Section dark={dark}>{username1[language]}</Section>
          <Detail
            dark={dark}
            type="text"
            value={username}
            placeholder="Eg: DarkKnight"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Details>
        <Details>
          <Section dark={dark}>STATUS</Section>
          <Detail
            dark={dark}
            type="text"
            value={status}
            placeholder="Eg: I'm Batman"
            onChange={(e) => setStatus(e.target.value)}
          />
        </Details>
        <Details>
          <Section dark={dark}>PICTURE</Section>
          <Detail
            dark={dark}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImage}
          />
        </Details>
        <Footer>
          {inProgress ? (
            <span>{editor.inProcess[language]}</span>
          ) : (
            <>
              <Button bgColor="#e15d5d" onClick={onClose}>
                {editor.cancel[language]}
              </Button>
              {((
                name !== original.name ||
                username !== original.username ||
                status !== original.status ||
                pp !== null
              ) && (
                <Button bgColor="#0072bb" onClick={handleUpdate}>
                    {editor.updAcc[language]}
                </Button>
              ))}
            </>
          )}
        </Footer>
      </ProfileEditContainer>
    );
};

export default ProfileEdit;
