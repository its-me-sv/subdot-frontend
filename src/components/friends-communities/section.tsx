import React from "react";
import SectionProfile from "./profile";

import {Section, SectionProfiles, SectionTitle} from "./styles";

import {useAppContext} from "../../contexts/app";

interface FrndCommSectionProps {
    title: string;
    ids: Array<string>;
}

const FrndCommSection: React.FC<FrndCommSectionProps> = ({
    title, ids
}) => {
    const {dark} = useAppContext();

    return (
        <Section>
            <SectionTitle dark={dark}>{title}</SectionTitle>
            <SectionProfiles>
                {ids.map((val) => (
                    <SectionProfile id={val} />
                ))}
            </SectionProfiles>
        </Section>
    );
};

export default FrndCommSection;
