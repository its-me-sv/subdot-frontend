import React, {useState} from "react";
import toast from "react-hot-toast";

import { useAppContext } from "../../contexts/app";
import { Button } from "../../utils/styles";
import { getImage } from "../../utils/utils";
import { Footer, ProfilePicture, Details, Section, Detail} from "../peek/styles";
import { ProfileEditContainer } from "./styles";

import {name as name1, username as username1} from "../../translations/peek";

interface ProfileEditProps {
  picture: string;
  username: string;
  name: string;
  status: string;
  address: string;
  setter: (
    pict: string,
    uuname: string,
    uname: string,
    ustatus: string
  ) => void;
  onClose: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = (props) => {
    const {dark, language} = useAppContext();
    const [picture, setPicture] = useState<string>(props.picture);
    const [username, setUsername] = useState<string>(props.username);
    const [name, setName] = useState<string>(props.name);
    const [status, setStatus] = useState<string>(props.status);
    const [pp, setPp] = useState<{ file: File; preview: string } | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files) return;
      let file = e.target.files[0];
      if (file.size > 4404019) return toast.error("File too big. Max size 4MB");
      let reader = new FileReader();
      reader.onloadend = () => {
        setPp({
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    };

    const handleUpdate = () => {};

    return (
      <ProfileEditContainer dark={dark}>
        <ProfilePicture
          alt={`${props.address.slice(5)} pp`}
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
            <span>Account updation in progress</span>
          ) : (
            <>
              <Button bgColor="#e15d5d" onClick={props.onClose}>
                CANCEL
              </Button>
              {((
                name !== props.name ||
                username !== props.username ||
                status !== props.status ||
                pp !== null
              ) && (
                <Button bgColor="#0072bb" onClick={handleUpdate}>
                    UPDATE ACCOUNT
                </Button>
              ))}
            </>
          )}
        </Footer>
      </ProfileEditContainer>
    );
};

export default ProfileEdit;
