import React from "react";

import {Container} from "./styles";

import Advert from "./advert";
import SmallMenu from "./small-menu";

interface RPAdvertProps {}

const RPAdvert: React.FC<RPAdvertProps> = () => {
    return (
        <Container>
            <SmallMenu />
            <Advert />
        </Container>
    );
};

export default RPAdvert;
