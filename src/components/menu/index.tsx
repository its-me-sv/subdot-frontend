import React from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

import {Container, MenuItem, BackgrorundHider} from "./styles";
import {menu} from "../../translations/header";
import {noAdvert} from "../../translations/toast";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import {useSocketContext} from "../../contexts/socket";

import profileLogo from "../../assets/icons/profile.png";
import reputationLogo from "../../assets/icons/reputation.png";
import txsLogo from "../../assets/icons/transactions.png";
import settingsLogo from "../../assets/icons/settings.png";
import advertLogo from "../../assets/icons/advert.png";
import termsLogo from "../../assets/icons/terms.png";
import policiesLogo from "../../assets/icons/policy.png";
import logoutLogo from "../../assets/icons/logout.png";
import chatLogo from "../../assets/icons/chat.png";
import newLogo from "../../assets/icons/new.png";
import feedBackLogo from "../../assets/icons/feedback.png";
import { useChatContext } from "../../contexts/chat";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
    const navigate = useNavigate();
    const {
        setMenuOpen, setShowTerms, 
        setSettingsOpen,
        setAdvertMenuOpen, setTxOpen,
        language, dark, advert
    } = useAppContext();
    const {logoutUser, user, account} = useUserContext();
    const {resetChat} = useChatContext();
    const {socket} = useSocketContext();

    const closeMenu = () => {
        setMenuOpen!(false);
    };

    const showTerms = () => {
        setShowTerms!(true);
        closeMenu();
    };

    const logout = () => {
      if (!account) return;
      socket.emit("leaveRoom", account.address);
      logoutUser!();
      resetChat!();
      closeMenu();
    };

    const takeToSubchat = () => {
      navigate("/subchat");
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
      if (advert) {
        toast.error(noAdvert[language]);
        return;
      }
      setAdvertMenuOpen!(true);
      closeMenu();
    };

    const openTransactions = () => {
        setTxOpen!(true);
        closeMenu();
    };

    return (
      <BackgrorundHider dark={dark} onClick={closeMenu}>
        <Container dark={dark} onClick={(event) => event.stopPropagation()}>
          <MenuItem dark={dark} onClick={takeToProfile}>
            <img src={profileLogo} />
            <span>{menu.profile[language]}</span>
          </MenuItem>
          <MenuItem dark={dark} onClick={takeToSubchat}>
            <img src={chatLogo} />
            <span>SUBCHAT</span>
            <img src={newLogo} />
          </MenuItem>
          <MenuItem dark={dark} onClick={takeToRP}>
            <img src={reputationLogo} />
            <span>{menu.rpBoard[language]}</span>
            <img src={newLogo} />
          </MenuItem>
          <MenuItem dark={dark} onClick={openTransactions}>
            <img src={txsLogo} />
            <span>{menu.transactions[language]}</span>
          </MenuItem>
          <MenuItem dark={dark} onClick={openSettings}>
            <img src={settingsLogo} />
            <span>{menu.settings[language]}</span>
          </MenuItem>
          <MenuItem dark={dark} onClick={openAdvertise}>
            <img src={advertLogo} />
            <span>{menu.advertise[language]}</span>
          </MenuItem>
          <MenuItem dark={dark} onClick={showTerms}>
            <img src={termsLogo} />
            <span>{menu.terms[language]}</span>
          </MenuItem>
          <MenuItem dark={dark} onClick={showTerms}>
            <img src={policiesLogo} />
            <span>{menu.policies[language]}</span>
          </MenuItem>
          <a href="https://subdot.canny.io/feedback" target="_blank">
            <MenuItem dark={dark}>
              <img src={feedBackLogo} />
              <span>{menu.feedback[language]}</span>
              <img src={newLogo} />
            </MenuItem>
          </a>
          <MenuItem dark={dark} onClick={logout}>
            <img src={logoutLogo} />
            <span>{menu.logout[language]}</span>
          </MenuItem>
        </Container>
      </BackgrorundHider>
    );
};

export default Menu;
