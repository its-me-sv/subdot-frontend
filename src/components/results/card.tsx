import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { ExploreResult, User } from "../../utils/types";
import { Item } from "./styles";

import { useAppContext } from "../../contexts/app";
import { DICE_BEAR } from "../../utils/constants";
import { useSubsocial } from "../../subsocial";
import { getImage } from "../../utils/utils";
import skeleton from "../../assets/loader.gif";

interface ResultCardProps extends ExploreResult {}

const ResultCard: React.FC<ResultCardProps> = ({
    accountId, username, name, reputation
}) => {
    const navigate = useNavigate();
    const {setExplore, dark, loggedIn} = useAppContext();
    const {api} = useSubsocial();
    const [picture, setPicture] = useState<string>(DICE_BEAR);
    const [stTxt, setStTxt] = useState<string | null>(null);
    
    const handlePress = () => {
      setExplore!("");
      if (!loggedIn) {
        window.alert("Create an account today");
        return;
      }
      navigate(`/profile/${username}`);
    };

    useEffect(() => {
        if (!api) return;
        api.base.findProfileSpace(accountId)
        .then(profile => {
            if (!profile?.content) return;
            const user = profile.content as unknown as User;
            setPicture(user.picture);
            setStTxt(user.status);
        });
    }, [api, accountId]);

    return (
      <Item dark={dark} onClick={handlePress}>
        <div id="info">
          <img alt="pp" src={getImage(picture)} />
          <div id="details">
            <span>{`${username} - ${name}`}</span>
            {stTxt === null ? (
              <img src={skeleton} alt="skeleton loading" />
            ) : (
              <span>{stTxt}</span>
            )}
          </div>
        </div>
        <span id="rp">{reputation} RP</span>
      </Item>
    );
};

export default ResultCard;
