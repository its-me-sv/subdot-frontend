import React from "react";

import {UserContainer} from "./styles";

interface UserProps {}

const User: React.FC<UserProps> = () => {
    return (
      <UserContainer>
        <img alt="pp" src={require("../../assets/temp.jpg")} />
        <span>{"<Dark Knight />"}</span>
        <span>200 RP</span>
      </UserContainer>
    );
};

export default User;
