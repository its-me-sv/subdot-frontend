import React from "react";

import {Container} from "./styles";
import {AdvertImage} from "../rp-advert/styles";

import {useAppContext} from "../../contexts/app";

interface AdvertSideViewProps {}

const AdvertSideView: React.FC<AdvertSideViewProps> = () => {
    const {dark} = useAppContext();
    
    return (
      <Container>
        <AdvertImage dark={dark} src={require("../../assets/temp.jpg")} />
        <AdvertImage dark={dark} src={require("../../assets/temp.jpg")} />
        <AdvertImage dark={dark} src={require("../../assets/temp.jpg")} />
        <AdvertImage dark={dark} src={require("../../assets/temp.jpg")} />
      </Container>
    );
};

export default AdvertSideView;
