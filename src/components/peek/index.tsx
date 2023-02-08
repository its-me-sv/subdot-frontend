import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import tempImg from "../../assets/temp.jpg";

import {Container, Box, CloseIcon} from '../terms-privacy/styles';
import {JoinedDate, ProfilePicture, Section, Detail, Content, Details, MetaDetails, MetaInfo, Footer} from "./styles";
import {
  memSce, username,
  name, meta, footer
} from "../../translations/peek";
import { DICE_BEAR } from "../../utils/constants";
import { getImage } from "../../utils/utils";

import {Button} from "../../utils/styles";
import { User } from "../../utils/types";

import {useAppContext} from "../../contexts/app";
import {useSubsocial} from "../../subsocial";

interface PeekProps {
  id: string;
}

const defaultUser: User = {
  created: "2023-02-07T16:25:55.956Z",
  username: "--------",
  name: "-------",
  status: "-------",
  picture: "-------",
  reputation: 0
};

const Peek: React.FC<PeekProps> = ({id}) => {
    const navigate = useNavigate();
    const {setPeek, setTransferId, language, dark} = useAppContext();
    const [user, setUser] = useState<User>({
      ...defaultUser,
      picture: `${DICE_BEAR}${id}`,
    });
    const {api} = useSubsocial();

    useEffect(() => {
      if (!api) return;
      api.base.findProfileSpace(id)
      .then(profile => {
        if (!profile?.content) return;
        const userData = profile.content as unknown as User;
        setUser(userData);
      });
    }, [api, id]);

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setPeek!("")} dark={dark}>
            X
          </CloseIcon>
          <ProfilePicture
            alt={`pp of ${id}`}
            src={getImage(user.picture)}
          />
          <JoinedDate dark={dark}>{memSce[language]} {(new Date(user.created)).toDateString()}</JoinedDate>
          <Details>
            <Section dark={dark}>{username[language]}</Section>
            <Detail
              dark={dark}
              type="text"
              value={user.username}
              readOnly
            />
          </Details>
          <Details>
            <Section dark={dark}>{name[language]}</Section>
            <Detail dark={dark} type="text" value={user.name} readOnly />
          </Details>
          <MetaDetails>
            <MetaInfo>
              <Content dark={dark}>{user.reputation}</Content>
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
              onClick={() => navigate(`/chat?user=${user.username}`)}
            >
              {footer.msg[language]}
            </Button>
            <Button bgColor="#005e20" onClick={() => setTransferId!(id)}>
              {footer.transfer[language]} $
            </Button>
            <Button
              bgColor={dark ? "#f5f4f9" : "#1a1a1a"}
              dark={dark}
              onClick={() => navigate(`/profile/${user.username}`)}
            >
              {footer.profile[language]}
            </Button>
          </Footer>
        </Box>
      </Container>
    );
};

export default Peek;
