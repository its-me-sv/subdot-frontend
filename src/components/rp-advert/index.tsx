import React from "react";

import {Container} from "./styles";

import Advert from "./advert";
import RP from "./rp";

interface RPAdvertProps {}

const RPAdvert: React.FC<RPAdvertProps> = () => {
    return (
        <Container>
            <RP />
            <Advert />
        </Container>
    );
};

export default RPAdvert;
