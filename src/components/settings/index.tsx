import React, {ChangeEvent} from "react";

import {Container, Title, CloseIcon, Box} from "../terms-privacy/styles";
import {SelectLang, ItemTitle, Item, ItemsContainer} from "./styles";

import {themes, languages} from '../../data/settings';
import {title, theme, lang} from "../../translations/settings";

import {useAppContext} from "../../contexts/app";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const {setSettingsOpen, setDark, setLanguage, dark, language} = useAppContext();

    const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) =>
      setDark!(event.target.value === "🌑");

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => 
      setLanguage!(Number(event.target.value));

    return (
      <Container dark={dark}>
        <Box dark={dark}>
          <CloseIcon onClick={() => setSettingsOpen!(false)} dark={dark}>
            X
          </CloseIcon>
          <Title dark={dark}>{title[language]}</Title>
          <ItemsContainer>
            <Item>
              <ItemTitle dark={dark}>{theme[language]}</ItemTitle>
              <SelectLang
                dark={dark}
                value={dark ? themes[1] : themes[0]}
                onChange={handleThemeChange}
              >
                {themes.map((val, idx) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </SelectLang>
            </Item>
            <Item>
              <ItemTitle dark={dark}>{lang[language]}</ItemTitle>
              <SelectLang
                dark={dark}
                value={language}
                onChange={handleLanguageChange}
              >
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
