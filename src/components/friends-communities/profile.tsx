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

interface SectionProfileProps {
    id: string;
    hover?: boolean;
}

const defaultUser: User = {
  created: "2023-02-07T16:25:55.956Z",
  username: "--------",
  name: "-------",
  status: "-------",
  picture: "-------",
};

const SectionProfile: React.FC<SectionProfileProps> = ({id, hover}) => {
    const {setPeek, dark} = useAppContext();
    const {api} = useSubsocial();
    const [user, setUser] = useState<User>(defaultUser);

    const fetchData = async () => {
      if (!api || !id) return;
      const profile = await api.base.findProfileSpace(id);
      if (!profile?.content) return;
      setUser(profile.content as unknown as User);
    };

    useEffect(() => {
      fetchData();
    }, [api, id]);

    return (
      <ProfileContainer onClick={() => setPeek!(id)} hover={hover} dark={dark}>
        <ProfileDetails>
          <ProfilePicture
            alt={`pp of ${id.slice(7)}`}
            src={getImage(user.picture)}
          />
          <ProfileInfo>
            <ProfileName dark={dark}>{user.username}</ProfileName>
            <ProfileStatusText dark={dark}>{user.status}</ProfileStatusText>
          </ProfileInfo>
        </ProfileDetails>
      </ProfileContainer>
    );
};

export default SectionProfile;
