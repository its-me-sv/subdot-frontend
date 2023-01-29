import React from "react";

import {
    ProfileContainer,  ProfileDetails, 
    ProfileInfo, ProfileName, 
    ProfilePicture, ProfileStatusText
} from './styles';

import {useAppContext} from "../../contexts";

interface SectionProfileProps {
    id: string;
}

const SectionProfile: React.FC<SectionProfileProps> = ({id}) => {
    const {setPeek} = useAppContext();

    return (
        <ProfileContainer onClick={() => setPeek!(id)}>
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
