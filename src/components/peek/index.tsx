import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, Box, CloseIcon} from '../terms-privacy/styles';
import {JoinedDate, ProfilePicture, Section, Detail, Content, Details, MetaDetails, MetaInfo, Footer} from "./styles";
import {
  memSce, username,
  name, meta, footer
} from "../../translations/peek";

import {useAppContext} from "../../contexts/app";
import {Button} from "../../utils/styles";

interface PeekProps {
    id: string;
}

const Peek: React.FC<PeekProps> = ({id}) => {
    const navigate = useNavigate();
    const {setPeek, setTransferId, language} = useAppContext();

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setPeek!("")}>X</CloseIcon>
          <ProfilePicture
            alt={`pp of ${id}`}
            src={require("../../assets/temp.jpg")}
          />
          <JoinedDate>{memSce[language]} May 11, 2002</JoinedDate>
          <Details>
            <Section>{username[language]}</Section>
            <Detail type="text" value={"<Dark Knight />"} readOnly />
          </Details>
          <Details>
            <Section>{name[language]}</Section>
            <Detail type="text" value={"Suraj Vijayan"} readOnly />
          </Details>
          <MetaDetails>
            <MetaInfo>
              <Content>42</Content>
              <Section>RP</Section>
            </MetaInfo>
            <MetaInfo>
              <Content>52</Content>
              <Section>{meta.followers[language]}</Section>
            </MetaInfo>
            <MetaInfo>
              <Content>76</Content>
              <Section>{meta.following[language]}</Section>
            </MetaInfo>
            <MetaInfo>
              <Content>14</Content>
              <Section>{meta.posts[language]}</Section>
            </MetaInfo>
          </MetaDetails>
          <Footer>
            <Button
              bgColor="#0072bb"
              onClick={() => navigate(`/chat?user=${id}`)}
            >
              {footer.msg[language]}
            </Button>
            <Button bgColor="#005e20" onClick={() => setTransferId!(id)}>
              {footer.transfer[language]} $
            </Button>
            <Button
              bgColor="#353132"
              onClick={() => navigate(`/profile/${id}`)}
            >
              {footer.profile[language]}
            </Button>
          </Footer>
        </Box>
      </Container>
    );
};

export default Peek;
