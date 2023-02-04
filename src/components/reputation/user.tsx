import React from "react";
import {useNavigate} from "react-router-dom";
import tmpImg from "../../assets/temp.jpg";

import {UserContainer} from "./styles";

import {useAppContext} from "../../contexts/app";

interface UserProps {}

const User: React.FC<UserProps> = () => {
    const navigate = useNavigate();
    const {dark} = useAppContext();

    return (
      <UserContainer dark={dark} onClick={() => navigate("/profile/suraj")}>
        <img alt="pp" src={tmpImg} />
        <span>{"<Dark Knight />"}</span>
        <span>200 RP</span>
      </UserContainer>
    );
};

export default User;
