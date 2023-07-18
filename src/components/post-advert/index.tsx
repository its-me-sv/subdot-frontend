import { AdvertImage } from "../rp-advert/styles";
import { AdvertInfoItem, UserAdvertContainer } from "../user-advert/styles";
import { useAppContext } from "../../contexts/app";
import skeleton from "../../assets/loader.gif";
import { useState } from "react";
import { FieldInput } from "./styles";
import { linkPh, link as lnkTxt } from "../../translations/advert";
import { toast } from "react-hot-toast";
import { fileBig } from "../../translations/toast";

interface PostAdvertProps {}

const PostAdvert: React.FC<PostAdvertProps> = () => {
    const {dark, language} = useAppContext();
    const [picture, setPicture] = useState<{
      file: File;
      preview: string;
    } | null>(null);
    const [link, setLink] = useState<string>("");

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files) return;
      let file = e.target.files[0];
      if (file.size > 4404019) return toast.error(fileBig[language]);
      let reader = new FileReader();
      reader.onloadend = () => {
        setPicture({
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    };

    return (
      <UserAdvertContainer>
        <AdvertImage
          dark={dark}
          alt="advertisement picture"
          src={picture?.preview || skeleton}
        />
        <div>
            <AdvertInfoItem dark={dark}>
            <span>{lnkTxt[language]}</span>
            <FieldInput
                dark={dark}
                type="text"
                placeholder={linkPh[language]}
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            </AdvertInfoItem>
            <AdvertInfoItem dark={dark}>
            <span>Picture</span>
            <FieldInput
                dark={dark}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImage}
            />
            </AdvertInfoItem>
        </div>
      </UserAdvertContainer>
    );
};

export default PostAdvert;
