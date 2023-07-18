import { AdvertImage } from "../rp-advert/styles";
import { AdvertInfoItem } from "../user-advert/styles";
import { useAppContext } from "../../contexts/app";
import skeleton from "../../assets/loader.gif";
import { useState } from "react";
import { FieldInput, FooterButton, UserAdvertContainer } from "./styles";
import { linkPh, link as lnkTxt } from "../../translations/advert";
import { toast } from "react-hot-toast";
import { fileBig } from "../../translations/toast";
import { Button } from "../../utils/styles";

interface PostAdvertProps {}

const PostAdvert: React.FC<PostAdvertProps> = () => {
    const {dark, language} = useAppContext();
    const [picture, setPicture] = useState<{
      file: File;
      preview: string;
    } | null>(null);
    const [link, setLink] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

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

    const handleSubmit = () => {
        if (link.length === 0) return toast.error("Link not provided");
        if (!picture) return toast.error("Picture not provided");
        if (startDate.length === 0) return toast.error("Start date not provided");
        if (endDate.length === 0) return toast.error("End date not provided");
        
        window.alert(JSON.stringify({
            link,
            startDate,
            endDate,
            picture,
        }));
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
          <AdvertInfoItem dark={dark}>
            <span>Start at</span>
            <FieldInput
              dark={dark}
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </AdvertInfoItem>
          <AdvertInfoItem dark={dark}>
            <span>End at</span>
            <FieldInput
              dark={dark}
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </AdvertInfoItem>
          <FooterButton>
            <Button
              bgColor={dark ? "#ffffff" : "#222222"}
              dark={dark}
              onClick={handleSubmit}
            >
              Post advertisement
            </Button>
          </FooterButton>
        </div>
      </UserAdvertContainer>
    );
};

export default PostAdvert;
