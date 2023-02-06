import axios from "axios";
import React, {useState} from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../contexts/app";
import { name as name1, username as username1 } from "../../translations/peek";
import { DICE_BEAR, REST_API } from "../../utils/constants";
import { Button } from "../../utils/styles";

import {WalletAccount} from "../../utils/types";
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
        if (!name.length || !username.length || !status.length) {
            return toast.error("Field(s) empty");
        }
        if (username.length > 10) return toast.error("Username too long");
        if (/^[a-zA-Z0-9]+$/.test(username) === false)
        return toast.error("Invalid username");
        const {presence} = (await axios.get(`${REST_API}/user/${username}`)).data;
        if (presence) return toast.error("Username already in use");
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
