import React from "react";

import {ProfileContainer,  ProfileDetails, ProfileInfo, ProfileName, ProfilePicture, ProfileStatusText} from './styles';

interface SectionProfileProps {
    id: string;
}

const SectionProfile: React.FC<SectionProfileProps> = ({id}) => {
    return (
        <ProfileContainer>
            <ProfileDetails>
                <ProfilePicture 
                    alt={`pp of ${id}`} 
                    src={require("../header/temp.jpg")} 
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
