import React from "react";

import {AdvertContainer, AdvertImage} from "./styles";

import {useAppContext} from "../../contexts/app";

interface AdvertProps {}

const Advert: React.FC<AdvertProps> = () => {
    const {dark} = useAppContext();

    return (
        <AdvertContainer>
            <AdvertImage dark={dark} src={require("../../assets/temp.jpg")} />
        </AdvertContainer>
    );
};

export default Advert;
