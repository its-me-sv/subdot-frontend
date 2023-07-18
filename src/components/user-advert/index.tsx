import axios from "axios";
import { useEffect, useState } from "react";

import { useAppContext } from "../../contexts/app";
import { defaultUserAdvert } from "../../data/advert";
import { UserAdvertDetails } from "../../utils/types";
import skeleton from "../../assets/loader.gif";

import { AdvertImage } from "../rp-advert/styles";
import { AdvertInfoItem, UserAdvertContainer } from "./styles";
import { REST_API } from "../../utils/constants";
import { link as lnkTxt } from "../../translations/advert";

interface UserAdvertProps {
    advertId: string
}

const UserAdvert: React.FC<UserAdvertProps> = ({advertId}) => {
    const {dark, language} = useAppContext();
    const [advertData, setAdvertData] = useState<UserAdvertDetails>(defaultUserAdvert);

    const fetchData = () => {
        axios.get(`${REST_API}/advert/detail/${advertId}`)
        .then(({data}) => setAdvertData(data));
    };

    useEffect(() => {
        if (!advertId) return;
        fetchData();
    }, [advertId]);

    return (
      <UserAdvertContainer>
        <AdvertImage
          dark={dark}
          alt="advertisement picture"
          src={advertData.picture === "-------" ? skeleton : advertData.picture}
        />
        <AdvertInfoItem dark={dark}>
          <span>{lnkTxt[language]}</span>
          {advertData.link === "-------" ? (
            <img src={skeleton} alt="skeleton loader" />
          ) : (
            <a href={advertData.link} target="_blank">
              {advertData.link}
            </a>
          )}
        </AdvertInfoItem>
      </UserAdvertContainer>
    );
};

export default UserAdvert;
