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
import { ProfileMeta, User } from "../../utils/types";

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
};

const defaultMeta: ProfileMeta = {
  followers: 0,
  following: 0,
  posts: 0
};

const Peek: React.FC<PeekProps> = ({id}) => {
    const navigate = useNavigate();
    const {setPeek, setTransferId, language, dark} = useAppContext();
    const [userMeta, setUserMeta] = useState<ProfileMeta>(defaultMeta);
    const [user, setUser] = useState<User>({
      ...defaultUser,
      picture: `${DICE_BEAR}${id}`,
    });
    const {api} = useSubsocial();

    const fetchData = async () => {
      if (!api) return;
      const profile = await api.base.findProfileSpace(id);
      if (!profile?.content) return;
      const userData = profile.content as unknown as User;
      setUser(userData);
      const substrateApi = await api.substrateApi;
      const followers = await substrateApi.query.accountFollows.accountFollowers(profile.struct.id.toString());
      const following = await substrateApi.query.accountFollows.accountsFollowedByAccount(profile.struct.id.toString());
      const postIds = await api.blockchain.postIdsBySpaceId(profile.struct.id);
      setUserMeta({
        followers: followers.length,
        following: following.length,
        posts: postIds.length
      });
    };

    useEffect(() => {
      fetchData();
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
              {/* <Content dark={dark}>{user.reputation || "--"}</Content> */}
              <Section dark={dark}>RP</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>{userMeta.followers || "--"}</Content>
              <Section dark={dark}>{meta.followers[language]}</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>{userMeta.following || "--"}</Content>
              <Section dark={dark}>{meta.following[language]}</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>{userMeta.posts || "--"}</Content>
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
