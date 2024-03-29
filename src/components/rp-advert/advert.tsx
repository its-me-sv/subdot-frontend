import React, {useEffect} from "react";
import axios from "axios";

import {AdvertContainer, AdvertImage} from "./styles";
import {noAdvertText} from "../../translations/advert";

import {useAppContext} from "../../contexts/app";
import { AdvertInfo } from "../../utils/types";
import { REST_API } from "../../utils/constants";
import { useSocketContext } from "../../contexts/socket";

interface AdvertProps {
    advert: AdvertInfo
}

const Advert: React.FC<AdvertProps> = ({advert}) => {
    const {dark, language} = useAppContext();
    const {socket} = useSocketContext();

    useEffect(() => {
        if (advert.id.length < 1) return;
        axios.put(`${REST_API}/advert/${advert.id}/true`);
        socket.emit("newView", advert.id);
    }, [advert.id]);

    const handleClick = () => {
        if (advert.id.length < 1) return;
        axios.put(`${REST_API}/advert/${advert.id}/false`);
        socket.emit("newClick", advert.id);
    };

    return (
      <AdvertContainer dark={dark}>
        {advert ? (
          <a
            onClick={handleClick}
            href={advert.link}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <AdvertImage dark={dark} src={advert.picture} />
          </a>
        ) : (
          <span>{noAdvertText[language]}</span>
        )}
      </AdvertContainer>
    );
};

export default Advert;
