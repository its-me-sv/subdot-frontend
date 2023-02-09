import React from "react";
import {useNavigate} from "react-router-dom";
import tmpImg from "../../assets/temp.jpg";

import {Button} from "../../utils/styles";
import {
  Container, Footer, 
  Joined, Status,
  Meta, MetaItem,
  Username, Name
} from "./styles";
import {memSce, meta, footer} from "../../translations/peek";

import {useAppContext} from "../../contexts/app";
import { useUserContext } from "../../contexts/user";

interface ProfileSideViewProps {
  accountId: string | undefined;
}

const ProfileSideView: React.FC<ProfileSideViewProps> = ({accountId}) => {
  const navigate = useNavigate();
  const {setTransferId, language, dark} = useAppContext();
  const {account: currAccount} = useUserContext();

  return (
    <Container dark={dark}>
      <img alt="pp" src={tmpImg} />
      <Username>{"<Dark Knight />"}</Username>
      <Name>Suraj Vijayan</Name>
      <Joined>{memSce[language]} May 11, 2002</Joined>
      <Status>The night is darkest just before the dawn</Status>
      <Meta>
        <MetaItem dark={dark}>
          <span>173</span>
          <span>{meta.reputation[language]}</span>
        </MetaItem>
        <MetaItem dark={dark}>
          <span>14</span>
          <span>{meta.posts[language]}</span>
        </MetaItem>
        <MetaItem dark={dark}>
          <span>52</span>
          <span>{meta.followers[language]}</span>
        </MetaItem>
        <MetaItem dark={dark}>
          <span>76</span>
          <span>{meta.following[language]}</span>
        </MetaItem>
      </Meta>
      {accountId !== currAccount?.address ? (
        <Footer>
          <Button
            bgColor="#0072bb"
            onClick={() => navigate(`/chat?user=${accountId}`)}
          >
            {footer.msg[language]}
          </Button>
          <Button
            bgColor="#005e20"
            onClick={() => setTransferId!(accountId as string)}
          >
            {footer.transfer[language]} $
          </Button>
          <Button bgColor={dark ? "#f5f4f9" : "#1a1a1a"} dark={dark}>
            {footer.follow[language]}
          </Button>
        </Footer>
      ) : (
        <Footer>
          <Button bgColor={dark ? "#f5f4f9" : "#1a1a1a"} dark={dark}>
            EDIT
          </Button>
        </Footer>
      )}
    </Container>
  );
};

export default ProfileSideView;
