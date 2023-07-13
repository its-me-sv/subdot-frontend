import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {simpleFormatBalance} from "@subsocial/utils";

import {Container, Footer, HomeLogo, MenuLogo, SettingsLogo} from "./styles";
import settingsLogo from "../../assets/icons/settings.png";

import Explore from "../explore";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import { getImage } from "../../utils/utils";
import { useSubsocial } from "../../subsocial";
import { Button } from "../../utils/styles";
import { settings } from "../../translations/login";
import { lgnCrt } from "../../translations/header";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();
    const {setMenuOpen, dark, setExplore, loggedIn, setSettingsOpen, language} = useAppContext();
    const {user, reputation, account} = useUserContext();
    const {api} = useSubsocial();
    const [balance, setBalance] = useState<string>("");
    
    useEffect(() => {
      if (!api || !account) return;
      let isMounted = true;
      let unsub: (() => void) | undefined;
      const sub = async () => {
        const substr = await api.substrateApi;
        unsub = await substr.derive.balances.all(account.address, (data) => {
          const balance = data.freeBalance;
          isMounted && setBalance(simpleFormatBalance(balance));
        });
      };
      isMounted && sub().catch((err) => console.log("Failed load balance:", err));
      return () => {
        unsub && unsub();
        isMounted = false;
      };
    }, [api, account]);

    const goHome = () => {
      setExplore!("");
      if (!loggedIn) {
        navigate("/");
      } else {
        navigate("/home");
      }
    };

    const goToRP = () => {
      setExplore!("");
      navigate("/rp");
    };

    const openMenu = () => {
      setExplore!("");
      setMenuOpen!(true);
    };
    
    if (window.location.hash === "#/")
      return <></>;

    return (
      <Container dark={dark}>
        <HomeLogo onClick={goHome} />
        {loggedIn && <Explore />}
        <Footer dark={dark}>
          {loggedIn ? (
            <>
              <span onClick={goToRP} title="Your reputation score">
                {reputation} RP
              </span>
              <span>{balance}</span>
              <MenuLogo
                onClick={openMenu}
                alt="menu"
                src={getImage(user?.picture ?? "")}
                title="menu"
              />
            </>
          ) : (
            <>
              <Button
                bgColor={dark ? "#ffffff" : "#222222"}
                dark={dark}
                onClick={goHome}
              >
                {lgnCrt[language]}
              </Button>
              <SettingsLogo
                src={settingsLogo}
                dark={dark}
                title={settings[language]}
                onClick={() => setSettingsOpen!(true)}
              />
            </>
          )}
        </Footer>
      </Container>
    );
};

export default Header;
