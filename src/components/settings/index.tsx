import React, {ChangeEvent} from "react";

import {Container, Title, CloseIcon, Box} from "../terms-privacy/styles";
import {SelectLang, ItemTitle, Item, ItemsContainer} from "./styles";

import {themes, languages} from '../../data/settings';

import {useAppContext} from "../../contexts/app";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const {setSettingsOpen, setDark, setLanguage, dark, language} = useAppContext();

    const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) =>
      setDark!(event.target.value === "1");

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
      console.log(Number(event.target.value));
      setLanguage!(Number(event.target.value));
    }

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setSettingsOpen!(false)}>X</CloseIcon>
          <Title>SETTINGS</Title>
          <ItemsContainer>
            <Item>
                <ItemTitle>THEME</ItemTitle>
                <SelectLang value={dark?"Dark":"Light"} onChange={handleThemeChange}>
                    {themes.map((val, idx) => (
                        <option key={val} value={idx.toString()}>
                            {val}
                        </option>
                    ))}
                </SelectLang>
            </Item>
            <Item>
                <ItemTitle>LANGUAGE</ItemTitle>  
                <SelectLang value={language} onChange={handleLanguageChange}>
                    {languages.map((val, idx) => (
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
