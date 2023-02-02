import React from "react";

import {InfoBox, InfoBoxTitle, InfoContent, InfoItem} from "./styles";
import {info} from "../../translations/rp";

import {useAppContext} from "../../contexts/app";

interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
    const {language} = useAppContext();

    return (
        <InfoBox>
            <InfoBoxTitle>{info.title[language]}</InfoBoxTitle>
            <InfoContent>
                <InfoItem>
                    <span>{info.action[language]}</span>
                    <span>RP</span>
                </InfoItem>
                <InfoItem>
                    <span>{info.post[language]}</span>
                    <span>7</span>
                </InfoItem>
                <InfoItem>
                    <span>{info.tip[language]}</span>
                    <span>2</span>
                </InfoItem>
                <InfoItem>
                    <span>{info.like[language]}</span>
                    <span>5</span>
                </InfoItem>
                <InfoItem>
                    <span>{info.followers[language]}</span>
                    <span>3</span>
                </InfoItem>
            </InfoContent>
        </InfoBox>
    );
};

export default Info;
