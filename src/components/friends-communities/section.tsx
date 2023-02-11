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
            <SectionProfiles dark={dark}>
                {ids.length === 0 && (
                    <span>No accounts to show.</span>
                )}
                {ids.map((val) => (
                    <SectionProfile key={val} id={val} />
                ))}
            </SectionProfiles>
        </Section>
    );
};

export default FrndCommSection;
