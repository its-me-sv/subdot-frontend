import React from "react";
import {useNavigate} from "react-router-dom";

import {UserContainer} from "./styles";

interface UserProps {}

const User: React.FC<UserProps> = () => {
    const navigate = useNavigate();

    return (
      <UserContainer onClick={() => navigate("/profile/suraj")}>
        <img alt="pp" src={require("../../assets/temp.jpg")} />
        <span>{"<Dark Knight />"}</span>
        <span>200 RP</span>
      </UserContainer>
    );
};

export default User;
