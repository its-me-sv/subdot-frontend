import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {Container, Box, CloseIcon} from '../terms-privacy/styles';
import {JoinedDate, ProfilePicture, Section, Detail, Content, Details, MetaDetails, MetaInfo, Footer} from "./styles";
import {
  memSce, username,
  name, meta, footer
} from "../../translations/peek";
import { REST_API } from "../../utils/constants";
import { getImage } from "../../utils/utils";

import {Button} from "../../utils/styles";
import { ProfileMeta, User } from "../../utils/types";
import { defaultMeta, defaultUser } from "./data";
import skeleton from "../../assets/loader.gif";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import {useSubsocial} from "../../subsocial";

interface PeekProps {
  id: string;
}

const Peek: React.FC<PeekProps> = ({id}) => {
    const navigate = useNavigate();
    const {setPeek, setTransferId, language, dark} = useAppContext();
    const [userMeta, setUserMeta] = useState<ProfileMeta>(defaultMeta);
    const [reputation, setReputation] = useState<number>(0);
    const [user, setUser] = useState<User>(defaultUser);
    const {api} = useSubsocial();
    const {account} = useUserContext();

    const fetchData = async () => {
      if (!api) return;
      const profile = await api.base.findProfileSpace(id);
      if (!profile?.content) return;
      const userData = profile.content as unknown as User;
      axios
        .get(`${REST_API}/user/user-rp/${id}`)
        .then(({ data }) => setReputation(data));
      setUser(userData);
      const substrateApi = await api.substrateApi;
      const followers = await substrateApi.query.accountFollows.accountFollowers(id);
      const following = await substrateApi.query.accountFollows.accountsFollowedByAccount(id);
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
          <ProfilePicture alt={`pp of ${id}`} src={getImage(user.picture)} />
          <JoinedDate dark={dark}>
            {memSce[language]} {new Date(user.created).toDateString()}
          </JoinedDate>
          <Details>
            <Section dark={dark}>{username[language]}</Section>
            {user.username === "--------" ? (
              <img src={skeleton} alt="skeleton loading" />
            ) : (
              <Detail dark={dark} type="text" value={user.username} readOnly />
            )}
          </Details>
          <Details>
            <Section dark={dark}>{name[language]}</Section>
            {user.username === "--------" ? (
              <img src={skeleton} alt="skeleton loading" />
            ) : (
              <Detail dark={dark} type="text" value={user.name} readOnly />
            )}
          </Details>
          <MetaDetails>
            <MetaInfo>
              <Content dark={dark}>{reputation || "-"}</Content>
              <Section dark={dark}>RP</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>{userMeta.followers || "-"}</Content>
              <Section dark={dark}>{meta.followers[language]}</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>{userMeta.following || "-"}</Content>
              <Section dark={dark}>{meta.following[language]}</Section>
            </MetaInfo>
            <MetaInfo>
              <Content dark={dark}>{userMeta.posts || "-"}</Content>
              <Section dark={dark}>{meta.posts[language]}</Section>
            </MetaInfo>
          </MetaDetails>
          <Footer>
            {user.username !== "--------" && account?.address !== id && (
              <>
                <Button
                  bgColor="#0072bb"
                  onClick={() => {
                    navigate(`/subchat`, {
                      state: { address: id },
                    });
                    setPeek!("");
                  }}
                >
                  {footer.msg[language]}
                </Button>
                <Button
                  bgColor="#005e20"
                  onClick={() => setTransferId!(`${id}:${user.username}`)}
                >
                  {footer.transfer[language]} $
                </Button>
              </>
            )}
            {user.username !== "--------" && (
              <Button
                bgColor={dark ? "#ffffff" : "#222222"}
                dark={dark}
                onClick={() => {
                  navigate(`/profile/${user.username}`);
                  setPeek!("");
                }}
              >
                {footer.profile[language]}
              </Button>
            )}
          </Footer>
        </Box>
      </Container>
    );
};

export default Peek;
