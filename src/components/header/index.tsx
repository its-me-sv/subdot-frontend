import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, Footer, HomeLogo, MenuLogo} from "./styles";

import Explore from "../explore";
import Menu from "../menu";

import {useAppContext} from "../../contexts/app";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();
    const {setMenuOpen, menuOpen, dark} = useAppContext();

    const goHome = () => {
      navigate("/home");
    };

    const openMenu = () => {
      setMenuOpen!(true);
    };

    return (
      <Container dark={dark}>
        <HomeLogo onClick={goHome} />
        <Explore />
        <Footer dark={dark}>
          <span>42 RP & 23$</span>
          <MenuLogo 
            onClick={openMenu}
            alt="menu" 
            src={require("../../assets/temp.jpg")} 
          />
        </Footer>
        {menuOpen && <Menu />}
      </Container>
    );
};

export default Header;
