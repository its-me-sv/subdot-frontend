import React from "react";

import {Container, LogoText, CaptionText} from "./styles";
import {title, caption} from "../../translations/login";

import {useAppContext} from "../../contexts/app";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
    const {dark, language} = useAppContext();

    return (
      <Container dark={dark}>
        <LogoText>{title[language]}</LogoText>
        <CaptionText dark={dark}>{caption[language]}</CaptionText>
      </Container>
    );
};

export default Loader;
