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
  AccountsContainer
} from "./styles";
import {Button} from "../../utils/styles";

import {
  title, caption, 
  button, footer, 
  settings
} from "../../translations/login";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";

import {getAllAccounts} from "../../subsocial/polkadot";
import {WalletAccount} from "../../utils/types";

interface LoginPageProps {}

let tried = false;

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const {
    setLoggedIn, setShowTerms, 
    setSettingsOpen, language,
    dark
  } = useAppContext();
  const {setAccount} = useUserContext();
  const [accounts, setAccounts] = useState<Array<WalletAccount>>([]);
  
  const onWalletConnect = useCallback(async () => {
    const accounts = await getAllAccounts();
    if (!accounts.length) {
      toast.error("No account found");
      return;
    }
    setAccounts(
      accounts.map((v) => ({
        address: v.address,
        name: v.meta.name || "No name",
      }))
    );
  }, []);
  
  const onAccountChoose = (account: WalletAccount) => {
    setAccount!(account);
    setLoggedIn!(true);
    navigate("/home");
  };

  useEffect(() => {
    if (tried) return;
    tried = true;
    onWalletConnect();
  }, []);

  return (
    <Container dark={dark}>
      <div>
        <LoginForm dark={dark}>
          <Title>{title[language]}</Title>
          <Caption dark={dark}>{caption[language]}</Caption>
          {accounts.length > 0 ? (
            <AccountsContainer dark={dark}>
              {accounts.map((acc) => (
                <div key={acc.address} onClick={() => onAccountChoose(acc)}>
                  <span>{acc.name}</span>
                  <span>{acc.address}</span>
                </div>
              ))}
            </AccountsContainer>
          ) : (
            <Button
              onClick={onWalletConnect}
              bgColor={dark ? "#f5f4f9" : "#1a1a1a"}
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
