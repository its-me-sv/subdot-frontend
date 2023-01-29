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

import {useAppContext} from "../../contexts";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const {setLoggedIn, setShowTerms, setSettingsOpen} = useAppContext();
  
  const onLogin = () => {
    setLoggedIn!(true);
    navigate("/home");
  };

  return (
    <Container>
      <div>
        <LoginForm>
          <Title>Subdot</Title>
          <Caption>Bringing power back to the people</Caption>
          <Button onClick={onLogin} bgColor="#1a1a1a">
            CONNECT WALLET
          </Button>
        </LoginForm>
      </div>
      <Footer1 onClick={() => setShowTerms!(true)}>
        Terms and Conditions | Privacy and Policy
      </Footer1>
      <Footer2 onClick={() => setSettingsOpen!(true)}>Settings</Footer2>
    </Container>
  );
};

export default LoginPage;
