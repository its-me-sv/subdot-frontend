import React from "react";
import {useNavigate} from "react-router-dom";

import {
  Container, 
  LoginForm, 
  Title, 
  LoginButton,
  Caption,
  Footer
} from "./styles";

import {useAppContext} from "../../contexts";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const {setLoggedIn} = useAppContext();
  
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
          <LoginButton onClick={onLogin}>
            CONNECT WALLET
          </LoginButton>
        </LoginForm>
      </div>
      <Footer>Terms and Conditions | Privacy and Policy</Footer>
    </Container>
  );
};

export default LoginPage;
