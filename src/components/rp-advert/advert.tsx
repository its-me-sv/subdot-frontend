import React from "react";

import {AdvertContainer, AdvertImage} from "./styles";

interface AdvertProps {}

const Advert: React.FC<AdvertProps> = () => {
    return (
        <AdvertContainer>
            <AdvertImage src={require("../../assets/temp.jpg")} />
        </AdvertContainer>
    );
};

export default Advert;
