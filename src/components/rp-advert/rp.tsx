import React from "react";
import {useNavigate} from "react-router-dom";

import {Button} from "../../utils/styles";
import {RPContainer, RPItem, RPTitle} from "./styles";

import {useAppContext} from "../../contexts";

interface RPProps {}

const RP: React.FC<RPProps> = () => {
    const navigate = useNavigate();
    const {setPeek} = useAppContext();

    return (
        <RPContainer>
            <RPTitle>REPUTATION RANKING</RPTitle>
            <div>
                {new Array(7).fill(0).map((v, i) => (
                    <RPItem onClick={() => setPeek!("Suraj Vijayan")}>
                        <span>#{i+1} Suraj Vijayan</span>
                        <span>- 200 RP</span>
                    </RPItem>
                ))}
            </div>
            <Button bgColor="#1a1a1a" onClick={() => navigate("/rp")}>
                VIEW MORE
            </Button>
        </RPContainer>
    );
};

export default RP;

