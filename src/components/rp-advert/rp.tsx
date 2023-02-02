import React from "react";
import {useNavigate} from "react-router-dom";

import {Button} from "../../utils/styles";
import {RPContainer, RPItem, RPTitle} from "./styles";
import {title, detail} from "../../translations/rp";

import {useAppContext} from "../../contexts/app";

interface RPProps {}

const RP: React.FC<RPProps> = () => {
    const navigate = useNavigate();
    const {setPeek, language, dark} = useAppContext();

    return (
      <RPContainer dark={dark}>
        <RPTitle dark={dark}>{title[language]}</RPTitle>
        <div>
          {new Array(5).fill(0).map((v, i) => (
            <RPItem dark={dark} onClick={() => setPeek!("Suraj Vijayan")}>
              <span>#{i + 1} Suraj Vijayan</span>
              <span>- 200 RP</span>
            </RPItem>
          ))}
        </div>
        <Button
          onClick={() => navigate("/rp")}
          bgColor={dark ? "#f5f4f9" : "#1a1a1a"}
          dark={dark}
        >
          {detail[language]}
        </Button>
      </RPContainer>
    );
};

export default RP;

