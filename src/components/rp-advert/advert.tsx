import React, {useEffect} from "react";

import {AdvertContainer, AdvertImage} from "./styles";

import {useAppContext} from "../../contexts/app";

interface AdvertProps {}

const Advert: React.FC<AdvertProps> = () => {
    const {dark, advert, setAdvert} = useAppContext();

    useEffect(() => {
        if (!advert) return;
        setTimeout(
            () => setAdvert!(null),
            new Date(advert.expires).getTime() - Date.now()
        );
    }, [advert]);

    return (
        <AdvertContainer dark={dark}>
            {advert ? (
                <a href={advert.link} target="_blank" referrerPolicy="no-referrer">
                    <AdvertImage dark={dark} src={advert.picture} />
                </a>
            ) : (
                <span>Advertisement(s) goes here</span>
            )}
        </AdvertContainer>
    );
};

export default Advert;
