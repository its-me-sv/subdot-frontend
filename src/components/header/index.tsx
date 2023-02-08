import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, Footer, HomeLogo, MenuLogo} from "./styles";

import Explore from "../explore";
import Menu from "../menu";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import { getImage } from "../../utils/utils";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();
    const {setMenuOpen, menuOpen, dark} = useAppContext();
    const {user} = useUserContext();

    const goHome = () => {
      navigate("/home");
    };

    const goToRP = () => {
      navigate("/rp");
    };

    const openMenu = () => {
      setMenuOpen!(true);
    };

    return (
      <Container dark={dark}>
        <HomeLogo onClick={goHome} />
        <Explore />
        <Footer dark={dark}>
          <span 
            onClick={goToRP}
            title="Your reputation score"
          >{user?.reputation || "--"} RP</span>
          <MenuLogo 
            onClick={openMenu}
            alt="menu" 
            src={getImage(user?.picture ?? "")} 
          />
        </Footer>
        {menuOpen && <Menu />}
      </Container>
    );
};

export default Header;
