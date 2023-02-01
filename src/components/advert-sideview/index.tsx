import React from "react";

import {Container} from "./styles";
import {AdvertImage} from "../rp-advert/styles";

interface AdvertSideViewProps {}

const AdvertSideView: React.FC<AdvertSideViewProps> = () => {
    return (
      <Container>
        <AdvertImage src={require("../../assets/temp.jpg")} />
        <AdvertImage src={require("../../assets/temp.jpg")} />
        <AdvertImage src={require("../../assets/temp.jpg")} />
        <AdvertImage src={require("../../assets/temp.jpg")} />
      </Container>
    );
};

export default AdvertSideView;
