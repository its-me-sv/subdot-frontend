import React from "react";

import {Container, Title, CloseIcon, Box} from "../terms-privacy/styles";

import {useAppContext} from "../../contexts";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const {setSettingsOpen} = useAppContext();

    return (
        <Container>
            <Box>
                <CloseIcon onClick={() => setSettingsOpen!(false)}>X</CloseIcon>
                <Title>Settings</Title>
            </Box>
        </Container>
    );
};

export default Settings
