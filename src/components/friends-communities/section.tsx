import React from "react";
import SectionProfile from "./profile";

import {Section, SectionProfiles, SectionTitle} from "./styles";

interface FrndCommSectionProps {
    title: string;
    ids: Array<string>;
}

const FrndCommSection: React.FC<FrndCommSectionProps> = ({
    title, ids
}) => {
    return (
        <Section>
            <SectionTitle>{title}</SectionTitle>
            <SectionProfiles>
                {ids.map((val) => (
                    <SectionProfile id={val} />
                ))}
            </SectionProfiles>
        </Section>
    );
};

export default FrndCommSection;
