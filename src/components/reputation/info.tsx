import React from "react";

import {InfoBox, InfoBoxTitle, InfoContent, InfoItem} from "./styles";

interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
    return (
        <InfoBox>
            <InfoBoxTitle>CRITERION</InfoBoxTitle>
            <InfoContent>
                <InfoItem>
                    <span>ACTION</span>
                    <span>RP</span>
                </InfoItem>
                <InfoItem>
                    <span>Every 5 Post</span>
                    <span>7</span>
                </InfoItem>
                <InfoItem>
                    <span>Per Tip given</span>
                    <span>2</span>
                </InfoItem>
                <InfoItem>
                    <span>Every 100th like (rec)</span>
                    <span>5</span>
                </InfoItem>
                <InfoItem>
                    <span>Per 10 Followers</span>
                    <span>3</span>
                </InfoItem>
            </InfoContent>
        </InfoBox>
    );
};

export default Info;
