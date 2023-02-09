import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import tmpImg from "../../assets/temp.jpg";
import axios from "axios";

import {Button} from "../../utils/styles";
import {
  Container, Footer, 
  Joined, Status,
  Meta, MetaItem,
  Username, Name
} from "./styles";
import {memSce, meta, footer} from "../../translations/peek";

import {useAppContext} from "../../contexts/app";
import {useUserContext} from "../../contexts/user";
import ProfileEdit from "./edit";

import {User, ProfileMeta} from "../../utils/types";
import { useSubsocial } from "../../subsocial";
import { DICE_BEAR, REST_API } from "../../utils/constants";
import { getImage } from "../../utils/utils";

interface ProfileSideViewProps {
  accountId: string | undefined;
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
  posts: 0,
};

const ProfileSideView: React.FC<ProfileSideViewProps> = ({accountId}) => {
  const navigate = useNavigate();
  const {setTransferId, language, dark} = useAppContext();
  const {account: currAccount} = useUserContext();
  const {api} = useSubsocial();
  const [userMeta, setUserMeta] = useState<ProfileMeta>(defaultMeta);
  const [reputation, setReputation] = useState<number>(0);
  const [user, setUser] = useState<User>({
    ...defaultUser,
    picture: `${DICE_BEAR}${accountId}`,
  });
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const fetchData = async () => {
    if (!api || !accountId) return;
    const profile = await api.base.findProfileSpace(accountId);
    if (!profile?.content) return;
    const userData = profile.content as unknown as User;
    axios
      .get(`${REST_API}/user/user-rp/${accountId}`)
      .then(({ data }) => setReputation(data));
    setUser(userData);
    const substrateApi = await api.substrateApi;
    const followers = await substrateApi.query.accountFollows.accountFollowers(accountId);
    const following = await substrateApi.query.accountFollows.accountsFollowedByAccount(accountId);
    const postIds = await api.blockchain.postIdsBySpaceId(profile.struct.id);
    setUserMeta({
      followers: followers.length,
      following: following.length,
      posts: postIds.length,
    });
  };

  useEffect(() => {
    fetchData();
  }, [accountId, api]);

  return (
    <Container dark={dark}>
      {editOpen && <ProfileEdit />}
      <img alt={`pp of ${accountId}`} src={getImage(user.picture)} />
      <Username>{"<Dark Knight />"}</Username>
      <Name>Suraj Vijayan</Name>
      <Joined>
        {memSce[language]} {new Date(user.created).toDateString()}
      </Joined>
      <Status>{user.status}</Status>
      <Meta>
        <MetaItem dark={dark}>
          <span>{reputation}</span>
          <span>{meta.reputation[language]}</span>
        </MetaItem>
        <MetaItem dark={dark}>
          <span>{userMeta.posts}</span>
          <span>{meta.posts[language]}</span>
        </MetaItem>
        <MetaItem dark={dark}>
          <span>{userMeta.followers}</span>
          <span>{meta.followers[language]}</span>
        </MetaItem>
        <MetaItem dark={dark}>
          <span>{userMeta.following}</span>
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
          <Button 
            bgColor={dark ? "#f5f4f9" : "#1a1a1a"} 
            dark={dark}
            onClick={() => setEditOpen(true)}
          >
            EDIT
          </Button>
        </Footer>
      )}
    </Container>
  );
};

export default ProfileSideView;
