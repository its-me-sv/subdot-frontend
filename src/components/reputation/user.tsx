import React from "react";
import {useNavigate} from "react-router-dom";

import {UserContainer} from "./styles";

import {useAppContext} from "../../contexts/app";

interface UserProps {}

const User: React.FC<UserProps> = () => {
    const navigate = useNavigate();
    const {dark} = useAppContext();

    return (
      <UserContainer dark={dark} onClick={() => navigate("/profile/suraj")}>
        <img alt="pp" src={require("../../assets/temp.jpg")} />
        <span>{"<Dark Knight />"}</span>
        <span>200 RP</span>
      </UserContainer>
    );
};

export default User;
