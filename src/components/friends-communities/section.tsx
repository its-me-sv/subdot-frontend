import React from "react";
import SectionProfile from "./profile";

import {Section, SectionProfiles, SectionTitle} from "./styles";

import {useAppContext} from "../../contexts/app";

interface FrndCommSectionProps {
    title: string;
    ids: Array<string>;
    fromChat?: boolean;
}

const FrndCommSection: React.FC<FrndCommSectionProps> = ({
    title, ids, fromChat
}) => {
    const {dark} = useAppContext();
    
    return (
      <Section dark={dark}>
        <SectionTitle dark={dark}>{title}</SectionTitle>
        <SectionProfiles dark={dark}>
          {ids.length === 0 && <span>No accounts to show.</span>}
          {ids.map((val) => (
            <SectionProfile key={val} id={val} fromChat={fromChat} />
          ))}
        </SectionProfiles>
      </Section>
    );
};

export default FrndCommSection;
