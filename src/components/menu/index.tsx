import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, MenuItem} from "./styles";
import {MenuLogo} from "../header/styles";

import {useAppContext} from "../../contexts/app";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
    const navigate = useNavigate();
    const {
        setMenuOpen, setShowTerms, 
        setLoggedIn, setSettingsOpen,
        setAdvertMenuOpen, setTxOpen
    } = useAppContext();

    const closeMenu = () => {
        setMenuOpen!(false);
    };

    const showTerms = () => {
        setShowTerms!(true);
        closeMenu();
    };

    const logout = () => {
        setLoggedIn!(false);
        closeMenu();
    };

    const takeToProfile = () => {
        navigate("/profile/dark-knight");
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
      <Container>
        <MenuLogo 
            onClick={closeMenu} 
            alt="menu" 
            src={require("../../assets/temp.jpg")} 
        />
        <MenuItem onClick={takeToProfile}>PROFILE</MenuItem>
        <MenuItem onClick={openTransactions}>TRANSACTIONS</MenuItem>
        <MenuItem onClick={openSettings}>SETTINGS</MenuItem>
        <MenuItem onClick={showTerms}>TERMS</MenuItem>
        <MenuItem onClick={showTerms}>POLICIES</MenuItem>
        <MenuItem onClick={openAdvertise}>ADVERTISE</MenuItem>
        <MenuItem onClick={logout}>LOG OUT</MenuItem>
      </Container>
    );
};

export default Menu;
