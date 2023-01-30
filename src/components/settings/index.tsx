import React, {ChangeEvent} from "react";

import {Container, Title, CloseIcon, Box} from "../terms-privacy/styles";
import {SelectLang, ItemTitle, Item, ItemsContainer} from "./styles";

import {THEMES, LANGUAGES} from './data';

import {useAppContext} from "../../contexts/app";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const {setSettingsOpen, setDark, setLanguage, dark, language} = useAppContext();

    const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) =>
      setDark!(event.target.value === "Dark");

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) =>
      setLanguage!(Number(event.target.value));

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setSettingsOpen!(false)}>X</CloseIcon>
          <Title>SETTINGS</Title>
          <ItemsContainer>
            <Item>
                <ItemTitle>THEME</ItemTitle>
                <SelectLang value={dark?"Dark":"Light"} onChange={handleThemeChange}>
                    {THEMES.map((val, idx) => (
                        <option key={val} value={idx}>
                            {val}
                        </option>
                    ))}
                </SelectLang>
            </Item>
            <Item>
                <ItemTitle>LANGUAGE</ItemTitle>  
                <SelectLang value={LANGUAGES[language]} onChange={handleLanguageChange}>
                    {LANGUAGES.map((val, idx) => (
                        <option key={val} value={idx}>
                            {val}
                        </option>
                    ))}
                </SelectLang>
            </Item>
          </ItemsContainer>
        </Box>
      </Container>
    );
};

export default Settings
