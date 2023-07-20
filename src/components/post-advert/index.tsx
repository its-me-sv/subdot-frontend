import { AdvertImage } from "../rp-advert/styles";
import { AdvertInfoItem } from "../user-advert/styles";
import { useAppContext } from "../../contexts/app";
import skeleton from "../../assets/loader.gif";
import { useEffect, useState } from "react";
import { FieldInput, FooterButton, UserAdvertContainer } from "./styles";
import { linkPh, link as lnkTxt } from "../../translations/advert";
import { toast } from "react-hot-toast";
import { fileBig } from "../../translations/toast";
import { Button } from "../../utils/styles";
import axios from "axios";
import { REST_API } from "../../utils/constants";
import { formatTimestamp, isValidDateRange } from "../../utils/utils";
import { useUserContext } from "../../contexts/user";
import { useSocketContext } from "../../contexts/socket";
import { AdvertInfo } from "../../utils/types";

interface PostAdvertProps {
  setAdvertId: React.Dispatch<React.SetStateAction<string>>;
}

const PostAdvert: React.FC<PostAdvertProps> = ({ setAdvertId }) => {
  const { dark, language } = useAppContext();
  const {socket} = useSocketContext();
  const { account } = useUserContext();
  const [picture, setPicture] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  const [link, setLink] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [availDate, setAvailDate] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    setFetching(true);
    axios
      .get(`${REST_API}/advert/last`)
      .then(({ data }) => {
        if (!data.expires) return;
        setAvailDate(formatTimestamp(data.expires));
        setStartDate(formatTimestamp(data.expires));
      })
      .finally(() => setFetching(false));
  }, []);

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
    if (!account) return;
    if (link.length === 0) return toast.error("Link not provided");
    if (!picture) return toast.error("Picture not provided");
    if (startDate.length === 0) return toast.error("Start date not provided");
    if (endDate.length === 0) return toast.error("End date not provided");
    if (!isValidDateRange(startDate, endDate)) return toast.error("Invalid date range");

    setFetching(true);

    const formData = new FormData();
    formData.append("userImage", picture.file);

    const pictPromise = axios.post(`${REST_API}/advert/check-nsfw`, formData);

    toast.promise(pictPromise, {
      loading: "Checking for NSFW",
      success: "NSFW check passed",
      error: "NSFW check failed"
    });

    pictPromise
      .then(({data}) => {
        const advertPromise = axios.post(`${REST_API}/advert/new`, {
          accountId: account.address,
          picture: data.picture,
          link,
          expires: endDate,
          startedAt: startDate,
        });

        toast.promise(advertPromise, {
          loading: "Posting advertisement",
          success: "Advertisement on air",
          error: "Unable to post advertisement",
        });

        advertPromise
          .then(({ data }) => {
            const newAdvertData: AdvertInfo = {
              id: data.created_at,
              crtd: startDate,
              picture: data.picture,
              link: data.link,
              expires: data.expires,
            };
            socket.emit("newAdvert", newAdvertData);
            setAdvertId(data.created_at);
          })
          .finally(() => setFetching(false));
      })
      .catch(() => setFetching(false));
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
            disabled={availDate.length > 0}
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
        {!fetching && (
          <FooterButton>
            <Button
              bgColor={dark ? "#ffffff" : "#222222"}
              dark={dark}
              onClick={handleSubmit}
            >
              Post advertisement
            </Button>
          </FooterButton>
        )}
      </div>
    </UserAdvertContainer>
  );
};

export default PostAdvert;
