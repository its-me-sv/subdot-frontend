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
    const {setPeek, setTransferId, language, dark} = useAppContext();

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setPeek!("")} dark={dark}>
            X
          </CloseIcon>
          <ProfilePicture
            alt={`pp of ${id}`}
            src={require("../../assets/temp.jpg")}
          />
          <JoinedDate dark={dark}>{memSce[language]} May 11, 2002</JoinedDate>
          <Details>
            <Section dark={dark}>{username[language]}</Section>
            <Detail
              dark={dark}
              type="text"
              value={"<Dark Knight />"}
              readOnly
            />
          </Details>
          <Details>
            <Section dark={dark}>{name[language]}</Section>
            <Detail dark={dark} type="text" value={"Suraj Vijayan"} readOnly />
          </Details>
          <MetaDetails>
            <MetaInfo>
              <Content dark={dark}>42</Content>
              <Section dark={dark}>RP</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>52</Content>
              <Section dark={dark}>{meta.followers[language]}</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>76</Content>
              <Section dark={dark}>{meta.following[language]}</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>14</Content>
              <Section dark={dark}>{meta.posts[language]}</Section>
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
              bgColor={dark ? "#f5f4f9" : "#1a1a1a"}
              dark={dark}
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
