import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { ExploreResult, User } from "../../utils/types";
import { Item } from "./styles";

import { useAppContext } from "../../contexts/app";
import { DICE_BEAR } from "../../utils/constants";
import { useSubsocial } from "../../subsocial";
import { getImage } from "../../utils/utils";

interface ResultCardProps extends ExploreResult {}

const ResultCard: React.FC<ResultCardProps> = ({
    accountId, username, name
}) => {
    const navigate = useNavigate();
    const {setExplore, dark} = useAppContext();
    const {api} = useSubsocial();
    const [picture, setPicture] = useState<string>(`${DICE_BEAR}${accountId}`);
    const [stTxt, setStTxt] = useState<string>("  ");
    
    const handlePress = () => {
      navigate(`/profile/${username}`);
      setExplore!("");
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
            <img alt="pp" src={getImage(picture)} />
            <div>
                <span>{`${username} - ${name}`}</span>
                <span>{stTxt}</span>
            </div>
        </Item>
    );
};

export default ResultCard;
