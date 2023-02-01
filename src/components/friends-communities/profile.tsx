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
    const {setPeek} = useAppContext();

    return (
      <ProfileContainer onClick={() => setPeek!(id)} hover={hover} >
        <ProfileDetails>
          <ProfilePicture
            alt={`pp of ${id}`}
            src={require("../../assets/temp.jpg")}
          />
          <ProfileInfo>
            <ProfileName>{id}</ProfileName>
            <ProfileStatusText>Status text</ProfileStatusText>
          </ProfileInfo>
        </ProfileDetails>
        {/* <HrLn /> */}
      </ProfileContainer>
    );
};

export default SectionProfile;
