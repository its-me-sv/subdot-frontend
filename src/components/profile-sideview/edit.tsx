import React from "react";

import { useAppContext } from "../../contexts/app";
import { ProfileEditContainer } from "./styles";

interface ProfileEditProps {}

const ProfileEdit: React.FC<ProfileEditProps> = () => {
    const {dark} = useAppContext();

    return (
        <ProfileEditContainer dark={dark}>
            Profile edit
        </ProfileEditContainer>
    );
};

export default ProfileEdit;
