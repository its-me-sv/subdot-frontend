import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";

import {Container} from '../home/styles';
import {profilePage} from "../../translations/page-titles";
import {accNotFnd} from "../../translations/toast";

import Posts from "../../components/posts";
import FriendsCommunites from "../../components/friends-communities";
import ProfileSideView from "../../components/profile-sideview";

import {useAppContext} from "../../contexts/app";
import axios from "axios";
import { REST_API } from "../../utils/constants";
import { useChatContext } from "../../contexts/chat";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {dark, resetAppContext, language} = useAppContext();
  const {resetChat} = useChatContext();
  const [accountId, setAccountId] = useState<string|undefined>(undefined);

  const fetchData = () => {
    const {id: username} = params;
    axios.get(`${REST_API}/user/username/${username}`)
    .then(({data}) => {
      if (data.presence) setAccountId(data.accountId);
      else {
        toast.error(accNotFnd[language]);
        navigate("/home");
      }
    })
    .catch(console.log);
  };

  useEffect(() => {
    window.document.title = `${params.id} / Subdot`;
    fetchData();
  }, [params]);

  useEffect(() => {
    resetChat!();
  }, []);

  return (
    <Container dark={dark}>
      <FriendsCommunites accountId={accountId} />
      <Posts accountId={accountId} />
      <ProfileSideView accountId={accountId} />
    </Container>
  );
};

export default ProfilePage;
