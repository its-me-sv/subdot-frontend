import React from "react";
import {useNavigate} from "react-router-dom";

import {
  Container, 
  LoginForm, 
  Title, 
  Caption,
  Footer1,
  Footer2
} from "./styles";
import {Button} from "../../utils/styles";

import {
  title, caption, 
  button, footer, 
  settings
} from "../../translations/login";

import {useAppContext} from "../../contexts/app";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const {
    setLoggedIn, setShowTerms, 
    setSettingsOpen, language,
    dark
  } = useAppContext();
  
  const onLogin = () => {
    setLoggedIn!(true);
    navigate("/home");
  };

  return (
    <Container dark={dark}>
      <div>
        <LoginForm dark={dark}>
          <Title>{title[language]}</Title>
          <Caption dark={dark}>{caption[language]}</Caption>
          <Button 
            onClick={onLogin} 
            bgColor={dark ? "#f5f4f9" : "#1a1a1a"}
            dark={dark}
          >
            {button[language]}
          </Button>
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
