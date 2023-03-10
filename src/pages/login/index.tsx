import React, {useState, useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

import {
  Container, 
  LoginForm, 
  Title, 
  Caption,
  Footer1,
  Footer2,
  AccountsContainer,
  Account,
  Caption2
} from "./styles";
import {Button} from "../../utils/styles";

import {
  title, caption, 
  button, footer, 
  settings, noAcc,
  caption2
} from "../../translations/login";
import {loginPage} from "../../translations/page-titles";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";

import {getAllAccounts} from "../../subsocial/polkadot";
import {WalletAccount} from "../../utils/types";
import { DICE_BEAR } from "../../utils/constants";

interface LoginPageProps {}

let tried = false;

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const {
    setLoggedIn, setShowTerms, 
    setSettingsOpen, language,
    dark
  } = useAppContext();
  const {loginUser} = useUserContext();
  const [accounts, setAccounts] = useState<Array<WalletAccount>>([]);
  
  const onWalletConnect = useCallback(async () => {
    const accounts = await getAllAccounts();
    if (!accounts.length) {
      toast.error(noAcc[language]);
      return;
    }
    setAccounts(accounts);
  }, [language]);
  
  const onAccountChoose = (account: WalletAccount) => {
    loginUser!(account, () => {
      setLoggedIn!(true);
      navigate("/home");
    });
  };

  useEffect(() => {
    window.document.title = `${loginPage[language]} • Subdot`;
  }, [language]);

  return (
    <Container dark={dark}>
      <div>
        <LoginForm dark={dark}>
          <Title>{title[language]}</Title>
          <Caption dark={dark}>{caption[language]}</Caption>
          <Caption2 dark={dark}>{caption2[language]}</Caption2>
          {accounts.length > 0 ? (
            <AccountsContainer>
              {accounts.map((acc) => (
                <Account
                  dark={dark}
                  key={acc.address}
                  onClick={() => onAccountChoose(acc)}
                >
                  <img
                    alt="pp"
                    src={`${DICE_BEAR}${acc.address}`}
                  />
                  <div>
                    <span>{acc.name}</span>
                    <span>{acc.address}</span>
                  </div>
                </Account>
              ))}
            </AccountsContainer>
          ) : (
            <Button
              onClick={onWalletConnect}
              bgColor={dark ? "#ffffff" : "#222222"}
              dark={dark}
            >
              {button[language]}
            </Button>
          )}
        </LoginForm>
      </div>
      <Footer1 onClick={() => setShowTerms!(true)} dark={dark}>
        {footer[language]}
      </Footer1>
      <Footer2 onClick={() => setSettingsOpen!(true)} dark={dark}>
        {settings[language]}
      </Footer2>
    </Container>
  );
};

export default LoginPage;
