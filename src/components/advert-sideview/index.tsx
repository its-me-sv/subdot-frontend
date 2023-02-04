import React from "react";
import tempImg from "../../assets/temp.jpg";

import {Container} from "./styles";
import {AdvertImage} from "../rp-advert/styles";

import {useAppContext} from "../../contexts/app";

interface AdvertSideViewProps {}

const AdvertSideView: React.FC<AdvertSideViewProps> = () => {
    const {dark} = useAppContext();
    
    return (
      <Container>
        <AdvertImage dark={dark} src={tempImg} />
        <AdvertImage dark={dark} src={tempImg} />
        <AdvertImage dark={dark} src={tempImg} />
        <AdvertImage dark={dark} src={tempImg} />
      </Container>
    );
};

export default AdvertSideView;
