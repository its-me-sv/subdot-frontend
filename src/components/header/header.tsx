import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, HomeLogo, MenuLogo} from "./styles";

import Explore from "../explore";
import Menu from "../menu";

import {useAppContext} from "../../contexts";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();
    const {setMenuOpen, menuOpen} = useAppContext();

    const goHome = () => {
      navigate("/home");
    };

    const openMenu = () => {
      setMenuOpen!(true);
    };

    return (
      <Container>
        <HomeLogo onClick={goHome} />
        <Explore />
        <MenuLogo 
          onClick={openMenu}
          alt="menu" 
          src={require("../../assets/temp.jpg")} 
        />
        {menuOpen && <Menu />}
      </Container>
    );
};

export default Header;
