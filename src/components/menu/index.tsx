import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, MenuItem} from "./styles";
import {MenuLogo} from "../header/styles";
import {menu} from "../../translations/header";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import { getImage } from "../../utils/utils";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
    const navigate = useNavigate();
    const {
        setMenuOpen, setShowTerms, 
        setSettingsOpen,
        setAdvertMenuOpen, setTxOpen,
        language, dark
    } = useAppContext();
    const {logoutUser, user} = useUserContext();

    const closeMenu = () => {
        setMenuOpen!(false);
    };

    const showTerms = () => {
        setShowTerms!(true);
        closeMenu();
    };

    const logout = () => {
        logoutUser!();
        closeMenu();
    };

    const takeToRP = () => {
      navigate("/rp");
      closeMenu();
    };

    const takeToProfile = () => {
        navigate(`/profile/${user?.username}`);
        closeMenu();
    };

    const openSettings = () => {
        setSettingsOpen!(true);
        closeMenu();
    };

    const openAdvertise = () => {
        setAdvertMenuOpen!(true);
        closeMenu();
    };

    const openTransactions = () => {
        setTxOpen!(true);
        closeMenu();
    };

    return (
      <Container dark={dark}>
        <MenuLogo
          onClick={closeMenu}
          alt="menu"
          src={getImage(user?.picture ?? "")}
        />
        <MenuItem dark={dark} onClick={takeToRP}>
          RP BOARD
        </MenuItem>
        <MenuItem dark={dark} onClick={takeToProfile}>
          {menu.profile[language]}
        </MenuItem>
        <MenuItem dark={dark} onClick={openTransactions}>
          {menu.transactions[language]}
        </MenuItem>
        <MenuItem dark={dark} onClick={openSettings}>
          {menu.settings[language]}
        </MenuItem>
        <MenuItem dark={dark} onClick={showTerms}>
          {menu.terms[language]}
        </MenuItem>
        <MenuItem dark={dark} onClick={showTerms}>
          {menu.policies[language]}
        </MenuItem>
        <MenuItem dark={dark} onClick={openAdvertise}>
          {menu.advertise[language]}
        </MenuItem>
        <MenuItem dark={dark} onClick={logout}>
          {menu.logout[language]}
        </MenuItem>
      </Container>
    );
};

export default Menu;
