import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {InfoBox, InfoContent, InfoItem, UserContainer, UserHeader, UserHeaderRight} from "./styles";
import { TopRPUser, UserAllTimeStats, User as UserType } from "../../utils/types";
import { DICE_BEAR, REST_API } from "../../utils/constants";

import {useAppContext} from "../../contexts/app";
import {useSubsocial} from "../../subsocial";
import { getImage } from "../../utils/utils";
import { defaultRPStats } from "../profile-sideview/data";
import axios from "axios";
import { info } from "../../translations/rp";

interface UserProps extends TopRPUser {}

const User: React.FC<UserProps> = ({
  accountId, username, reputation
}) => {
    const navigate = useNavigate();
    const {dark, language} = useAppContext();
    const { api } = useSubsocial();
    const [picture, setPicture] = useState<string>(DICE_BEAR);
    const [rpStats, setRpStats] = useState<UserAllTimeStats>(defaultRPStats);

    useEffect(() => {
      if (!api) return;
      api.base.findProfileSpace(accountId).then((profile) => {
        if (!profile?.content) return;
        const user = profile.content as unknown as UserType;
        setPicture(user.picture);
      });
      axios
        .get(`${REST_API}/user/all-time-stats/${accountId}`)
        .then(({ data }) => setRpStats(data));
    }, [api, accountId]);

    return (
      <UserContainer
        dark={dark}
        onClick={() => navigate(`/profile/${username}`)}
      >
        <UserHeader>
          <img alt="pp" src={getImage(picture)} />
          <UserHeaderRight>
            <span>{username}</span>
            <span>{rpStats.total_rp || "--"} RP</span>
          </UserHeaderRight>
        </UserHeader>
        <InfoBox dark={dark} frmPrf frmUsr>
          <InfoContent>
            <InfoItem dark={dark}>
              <span>{info.action[language]}</span>
              <span>Total</span>
            </InfoItem>
            <InfoItem dark={dark}>
              <span>{info.post[language]}</span>
              <span>{rpStats.e5p || "--"}</span>
            </InfoItem>
            <InfoItem dark={dark}>
              <span>{info.followers[language]}</span>
              <span>{rpStats.p10f || "--"}</span>
            </InfoItem>
            <InfoItem dark={dark}>
              <span>{info.tip[language]}</span>
              <span>{rpStats.ptg || "--"}</span>
            </InfoItem>
            <InfoItem dark={dark}>
              <span>{info.accCrt[language]}</span>
              <span>{rpStats.ac || "--"}</span>
            </InfoItem>
          </InfoContent>
        </InfoBox>
      </UserContainer>
    );
};

export default User;
