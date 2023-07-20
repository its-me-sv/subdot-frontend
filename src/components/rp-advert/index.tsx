import React from "react";

import {Container} from "./styles";

import Advert from "./advert";
import SmallMenu from "./small-menu";
import { useAppContext } from "../../contexts/app";

interface RPAdvertProps {}

const RPAdvert: React.FC<RPAdvertProps> = () => {
    const {adverts} = useAppContext();
    return (
        <Container>
            <SmallMenu />
            {adverts.length > 0 && <Advert advert={adverts[0]} />}
        </Container>
    );
};

export default RPAdvert;
