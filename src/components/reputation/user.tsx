import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {UserContainer} from "./styles";
import { TopRPUser, User as UserType } from "../../utils/types";
import { DICE_BEAR } from "../../utils/constants";

import {useAppContext} from "../../contexts/app";
import {useSubsocial} from "../../subsocial";
import { getImage } from "../../utils/utils";

interface UserProps extends TopRPUser {}

const User: React.FC<UserProps> = ({
  accountId, username, reputation
}) => {
    const navigate = useNavigate();
    const {dark} = useAppContext();
    const { api } = useSubsocial();
    const [picture, setPicture] = useState<string>(DICE_BEAR);

    useEffect(() => {
      if (!api) return;
      api.base.findProfileSpace(accountId).then((profile) => {
        if (!profile?.content) return;
        const user = profile.content as unknown as UserType;
        setPicture(user.picture);
      });
    }, [api, accountId]);

    return (
      <UserContainer 
        dark={dark} 
        onClick={() => navigate(`/profile/${username}`)}
      >
        <img alt="pp" src={getImage(picture)} />
        <span>{username}</span>
        <span>{reputation} RP</span>
      </UserContainer>
    );
};

export default User;
