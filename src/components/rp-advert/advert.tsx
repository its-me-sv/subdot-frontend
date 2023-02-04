import React from "react";
import tmpImg from "../../assets/temp.jpg";

import {AdvertContainer, AdvertImage} from "./styles";

import {useAppContext} from "../../contexts/app";

interface AdvertProps {}

const Advert: React.FC<AdvertProps> = () => {
    const {dark} = useAppContext();

    return (
        <AdvertContainer>
            <AdvertImage dark={dark} src={tmpImg} />
        </AdvertContainer>
    );
};

export default Advert;
