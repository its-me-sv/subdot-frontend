import React from "react";

import {
    ProfileContainer,  ProfileDetails, 
    ProfileInfo, ProfileName, 
    ProfilePicture, ProfileStatusText
} from './styles';

import {useAppContext} from "../../contexts/app";

interface SectionProfileProps {
    id: string;
    hover?: boolean;
}

const SectionProfile: React.FC<SectionProfileProps> = ({id, hover}) => {
    const {setPeek, dark} = useAppContext();

    return (
      <ProfileContainer onClick={() => setPeek!(id)} hover={hover} dark={dark}>
        <ProfileDetails>
          <ProfilePicture
            alt={`pp of ${id}`}
            src={require("../../assets/temp.jpg")}
          />
          <ProfileInfo>
            <ProfileName dark={dark}>{id}</ProfileName>
            <ProfileStatusText dark={dark}>Status text</ProfileStatusText>
          </ProfileInfo>
        </ProfileDetails>
        {/* <HrLn /> */}
      </ProfileContainer>
    );
};

export default SectionProfile;
