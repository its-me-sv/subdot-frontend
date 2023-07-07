import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {simpleFormatBalance} from "@subsocial/utils";

import {Container, Footer, HomeLogo, MenuLogo} from "./styles";

import Explore from "../explore";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import { getImage } from "../../utils/utils";
import { useSubsocial } from "../../subsocial";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();
    const {setMenuOpen, dark, setExplore} = useAppContext();
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
      navigate("/home");
    };

    const goToRP = () => {
      setExplore!("");
      navigate("/rp");
    };

    const openMenu = () => {
      setExplore!("");
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
          >{reputation} RP</span>
          <span>{balance}</span>
          <MenuLogo 
            onClick={openMenu}
            alt="menu" 
            src={getImage(user?.picture ?? "")}
            title="menu"
          />
        </Footer>
      </Container>
    );
};

export default Header;
