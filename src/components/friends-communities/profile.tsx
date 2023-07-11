import React, {useEffect, useState} from "react";

import {
    ProfileContainer,  ProfileDetails, 
    ProfileInfo, ProfileName, 
    ProfilePicture, ProfileStatusText
} from './styles';

import {useAppContext} from "../../contexts/app";
import { User } from "../../utils/types";
import { getImage } from "../../utils/utils";
import { useSubsocial } from "../../subsocial";
import { defaultUser } from "./data";
import { useChatContext } from "../../contexts/chat";
import skeleton from "../../assets/loader.gif";

interface SectionProfileProps {
    id: string;
    hover?: boolean;
    fromChat?: boolean;
}

const SectionProfile: React.FC<SectionProfileProps> = ({id, hover, fromChat}) => {
    const {setPeek, dark} = useAppContext();
    const {setCurrChat} = useChatContext();
    const {api} = useSubsocial();
    const [user, setUser] = useState<User>(defaultUser);

    const fetchData = async () => {
      if (!api || !id) return;
      const profile = await api.base.findProfileSpace(id);
      if (!profile?.content) return;
      setUser(profile.content as unknown as User);
    };

    const handleClick = () => {
      if (fromChat) {
        setCurrChat!(id);
        return;
      }
      setPeek!(id);
    };

    useEffect(() => {
      fetchData();
    }, [api, id]);

    return (
      <ProfileContainer onClick={handleClick} hover={hover} dark={dark}>
        <ProfileDetails>
          <ProfilePicture
            alt={`pp of ${id.slice(7)}`}
            src={getImage(user.picture)}
          />
          <ProfileInfo>
            {user.username === "--------" ? (
              <>
                <img src={skeleton} alt="skeleton loading" />
                <img src={skeleton} alt="skeleton loading" />
              </>
            ) : (
              <>
                <ProfileName dark={dark}>{user.username}</ProfileName>
                <ProfileStatusText dark={dark} hover={hover}>
                  {user.status}
                </ProfileStatusText>
              </>
            )}
          </ProfileInfo>
        </ProfileDetails>
      </ProfileContainer>
    );
};

export default SectionProfile;
