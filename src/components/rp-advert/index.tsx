import React from "react";

import {Container} from "../friends-communities/styles";

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
