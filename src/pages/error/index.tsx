import React, {useEffect} from "react";

import {Container} from "./styles";
import {title, caption} from "../../translations/error";
import {errorPage} from "../../translations/page-titles";

import {useAppContext} from "../../contexts/app";

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
    const {language, dark} = useAppContext();

    useEffect(() => {
        window.document.title = `${errorPage[language]} • Subdot`;
    }, [language]);

    return (
        <Container dark={dark}>
            <span>{title[language]}</span>
            <span>{caption[language]}</span>
        </Container>
    );
};

export default ErrorPage;
