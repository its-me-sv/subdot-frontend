import React from "react";

import {Container} from "./styles";
import {title, caption} from "../../translations/error";

import {useAppContext} from "../../contexts/app";

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
    const {language, dark} = useAppContext();

    return (
        <Container dark={dark}>
            <span>{title[language]}</span>
            <span>{caption[language]}</span>
        </Container>
    );
};

export default ErrorPage;
