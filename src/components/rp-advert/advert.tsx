import React, {useEffect} from "react";

import {AdvertContainer, AdvertImage} from "./styles";
import {noAdvertText} from "../../translations/advert";

import {useAppContext} from "../../contexts/app";
import { AdvertInfo } from "../../utils/types";

interface AdvertProps {
    advert: AdvertInfo
}

const Advert: React.FC<AdvertProps> = ({advert}) => {
    const {dark, language} = useAppContext();

    return (
        <AdvertContainer dark={dark}>
            {advert ? (
                <a href={advert.link} target="_blank" referrerPolicy="no-referrer">
                    <AdvertImage dark={dark} src={advert.picture} />
                </a>
            ) : (
                <span>{noAdvertText[language]}</span>
            )}
        </AdvertContainer>
    );
};

export default Advert;
