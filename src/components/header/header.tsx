import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, HomeLogo, MenuLogo} from "./styles";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/home");
    }

    return (
      <Container>
        <HomeLogo  onClick={goHome} />
        <span>explore</span>
        <MenuLogo alt="pp" src={require("./temp.jpg")} />
      </Container>
    );
};

export default Header;
