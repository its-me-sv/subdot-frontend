import axios from "axios";
import React, {useState} from "react";
import toast from "react-hot-toast";
import {IpfsContent} from "@subsocial/api/substrate/wrappers";
import {getNewIdsFromEvent} from "@subsocial/api/utils";
import { useAppContext } from "../../contexts/app";
import { useSubsocial } from "../../subsocial";
import { name as name1, username as username1 } from "../../translations/peek";
import { DICE_BEAR, REST_API } from "../../utils/constants";
import { Button } from "../../utils/styles";
import {getSigner, logTransaction} from "../../subsocial/polkadot";

import {User, WalletAccount} from "../../utils/types";
import { ProfilePicture, Footer, Details, Section, Detail } from "../peek/styles";

import {Container, Box} from "../terms-privacy/styles";

interface NewAccountProps {
    account: WalletAccount
}

const NewAccount: React.FC<NewAccountProps> = ({account}) => {
    const [name, setName] = useState<string>(account.name);
    const [username, setUsername] = useState<string>("");
    const [status, setStaus] = useState<string>("Hi there I'm new to Subdot");
    const [pp, setPp] = useState<{file: File; preview: string;}|null>(null);
    const {dark, setNewAccount, language} = useAppContext();
    const {api} = useSubsocial();

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files) return;
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setPp({
                file,
                preview: reader.result as string
            });
        };
        reader.readAsDataURL(file);
    };

    const createAccount = async () => {
        if (!api) return;
        if (!name.length || !username.length || !status.length) {
            return toast.error("Field(s) empty");
        }
        if (username.length > 10) return toast.error("Username too long");
        if (status.length > 84) return toast.error("Status too long");
        if (name.length > 42) return toast.error("Name too long");
        if (/^[a-zA-Z0-9]+$/.test(username) === false)
        return toast.error("Invalid username");
        const {presence} = (await axios.get(`${REST_API}/user/username/${username}`)).data;
        if (presence) return toast.error("Username already in use");
        let newUser: User = {
          created: new Date().toISOString(),
          username,
          name,
          status,
          picture: `${DICE_BEAR}${account.address}`
        };
        if (pp) {
            const ppId = await api.ipfs.saveFile(pp.file);
            newUser.picture = ppId;
        }
        const cid = await api.ipfs.saveContent({...newUser});
        const substrateApi = await api.substrateApi;
        const spaceTx = substrateApi.tx.spaces.createSpace(
          IpfsContent(cid),
          null
        );
        const createProfilePromise = new Promise(async (resolve, reject) => {
          const signer = await getSigner(account.address);
          if (!signer) return reject();
          await spaceTx.signAsync(account.address, {signer});
          await spaceTx.send(async (result: any) => {
            const { status } = result;
            if (!result || !status) return reject();
            if (status.isFinalized) {
              const spaceId = getNewIdsFromEvent(result)[0].toString();
              const profileTx = substrateApi.tx.profiles.setProfile(spaceId);
              await profileTx.signAsync(account.address, { signer });
              await profileTx.send(async (result: any) => {
                const { status } = result;
                if (!result || !status) return reject();
                if (status.isFinalized) 
                return resolve(true);
              });
            }
          });
        });
        toast.promise(createProfilePromise, {
          loading: "Creating profile",
          success: "Profile has been created successfully",
          error: "Unable to create profile"
        });
    };

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <ProfilePicture
            alt={`${account.address.slice(5)} pp`}
            src={pp !== null ? pp.preview : `${DICE_BEAR}${account.address}`}
          />
          <Details>
            <Section dark={dark}>{name1[language]}</Section>
            <Detail
              dark={dark}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Details>
          <Details>
            <Section dark={dark}>{username1[language]}</Section>
            <Detail
              dark={dark}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Details>
          <Details>
            <Section dark={dark}>STATUS</Section>
            <Detail
              dark={dark}
              type="text"
              value={status}
              onChange={(e) => setStaus(e.target.value)}
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
            <Button bgColor="#e15d5d" onClick={() => setNewAccount!(null)}>
              CANCEL
            </Button>
            <Button bgColor="#0072bb" onClick={createAccount}>
              CREATE ACCOUNT
            </Button>
          </Footer>
        </Box>
      </Container>
    );
};

export default NewAccount;
